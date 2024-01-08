import {Injectable, inject} from '@angular/core';
import {ComponentStore} from '@ngrx/component-store';
import {
  Observable,
  ReplaySubject,
  combineLatest,
  debounceTime,
  filter,
  fromEvent,
  of,
  switchMap,
  takeUntil,
  tap,
  zip,
} from 'rxjs';
import {WINDOW} from '../injection-tokens';
import {Mode} from '../toolbar/toolbar.component';

export interface SimpleSketchCanvasState {
  backgroundColor: string;
  isSketching: boolean;
  lastX: number;
  lastY: number;
  lineWidth: number;
  mode: Mode;
  paintColor: string;
}

const INITIAL_STATE: SimpleSketchCanvasState = {
  backgroundColor: '#000000',
  isSketching: false,
  lastX: 0,
  lastY: 0,
  lineWidth: 5,
  mode: Mode.SKETCH,
  paintColor: '#ffffff',
};

export interface Point {
  x: number;
  y: number;
}

export interface Size {
  height: number;
  width: number;
}

@Injectable()
export class SimpleSketchCanvasStore extends ComponentStore<SimpleSketchCanvasState> {
  private canvas$ = new ReplaySubject<HTMLCanvasElement>(1);
  private context$ = new ReplaySubject<CanvasRenderingContext2D>(1);
  private window = inject(WINDOW);

  /**
   * +-------------------------------------------+
   * SELECTORS
   * +-------------------------------------------+
   */
  readonly backgroundColor$: Observable<string> = this.select(
    state => state.backgroundColor
  );

  readonly isSketching$: Observable<boolean> = this.select(
    state => state.isSketching
  );

  readonly lineWidth$: Observable<number> = this.select(
    state => state.lineWidth
  );

  readonly mode$: Observable<Mode> = this.select(state => state.mode);

  readonly paintColor$: Observable<string> = this.select(
    state => state.paintColor
  );

  readonly lastPosition$: Observable<Point> = this.select(state => ({
    x: state.lastX,
    y: state.lastY,
  }));

  /**
   * +-------------------------------------------+
   * UPDATERS
   * +-------------------------------------------+
   */
  readonly updateBackGroundColor = this.updater(
    (state, newBackgroundColor: string) => ({
      ...state,
      backgroundColor: newBackgroundColor,
    })
  );

  readonly updateIsSketching = this.updater((state, isSketching: boolean) => ({
    ...state,
    isSketching,
  }));

  readonly updatePaintColor = this.updater((state, newPaintColor: string) => ({
    ...state,
    paintColor: newPaintColor,
  }));

  readonly updateMode = this.updater((state, newMode: Mode) => ({
    ...state,
    mode: newMode,
  }));

  readonly updateLastPosition = this.updater((state, newPosition: Point) => ({
    ...state,
    lastX: newPosition.x,
    lastY: newPosition.y,
  }));

  /**
   * +-------------------------------------------+
   * EFFECTS
   * +-------------------------------------------+
   */
  readonly applyBackgroundColor = this.effect(() => {
    return combineLatest([this.backgroundColor$, this.canvas$]).pipe(
      tap(([color, canvas]) => {
        if (canvas) {
          canvas.style.backgroundColor = color;
        }
      })
    );
  });

  readonly clearCanvas = this.effect(trigger$ =>
    combineLatest([trigger$, this.context$, this.canvas$]).pipe(
      tap(([, context, canvas]) => {
        if (context && canvas) {
          context.clearRect(0, 0, canvas.width, canvas.height);
        }
      })
    )
  );

  readonly init = this.effect(
    (data$: Observable<[HTMLCanvasElement, string, string]>) => {
      return data$.pipe(
        tap(([canvas, backgroundColor, paintColor]) => {
          const context = canvas.getContext('2d');
          // Initialize canvas & context properties using the supplied `canvas`.
          this.canvas$.next(canvas);
          this.context$.next(context as CanvasRenderingContext2D);

          // Canvases must have their width and height pixel values set. The
          // canvas' _parent (`.canvas-wrapper`), flexes to grow to the
          // available space. Set the actual canvas element to the pixel
          // dimensions available inside its parent.
          const canvasWrapper = canvas.parentElement as HTMLElement;
          const canvasWrapperSize =
            this.getElementSizeMinusPadding(canvasWrapper);

          this.resizeCanvas([
            canvasWrapperSize.width,
            canvasWrapperSize.height,
          ]);

          // Update property values in component state.
          this.updateBackGroundColor(backgroundColor);
          this.updatePaintColor(paintColor);

          this.applyBackgroundColor();

          // Subscribe to resize events so the canvas' pixel dimensions redraw
          // using the values from the post-resize available space.
          fromEvent(this.window, 'resize')
            .pipe(takeUntil(this.destroy$), debounceTime(75))
            .subscribe(() => {
              const canvasWrapperSize =
                this.getElementSizeMinusPadding(canvasWrapper);

              this.resizeCanvas([
                canvasWrapperSize.width,
                canvasWrapperSize.height,
              ]);
            });
        })
      );
    }
  );

  readonly resizeCanvas = this.effect((args$: Observable<[number, number]>) => {
    return args$.pipe(
      switchMap(([width, height]) => {
        return combineLatest([
          this.canvas$,
          this.context$,
          of(width),
          of(height),
        ]);
      }),
      filter(
        /* eslint-disable @typescript-eslint/no-unused-vars */
        ([canvas, context, width, height]) =>
          canvas !== null && context !== null
      ),
      tap(([canvas, context, width, height]) => {
        // Resizing the canvas will clear its contents, so store the current
        // canvas contents before resizing so they can be restored after.
        const currentCanvasContent = context!.getImageData(
          0,
          0,
          canvas!.width,
          canvas!.height
        );

        // Now resize the canvas.
        canvas!.width = width;
        canvas!.height = height;

        // Reapply saved contents.
        context!.putImageData(currentCanvasContent, 0, 0);
      })
    );
  });

  readonly sketch = this.effect(
    (event$: Observable<MouseEvent | TouchEvent>) => {
      return event$.pipe(
        switchMap(event =>
          zip(
            of(event),
            this.context$,
            this.isSketching$,
            this.lineWidth$,
            this.paintColor$,
            this.mode$,
            this.lastPosition$
          )
        ),
        tap(
          ([
            event,
            context,
            isSketching,
            lineWidth,
            paintColor,
            mode,
            lastPosition,
          ]) => {
            event.preventDefault();

            const screenPosition = this.getEventPosition(event, context.canvas);
            if (isSketching && context) {
              context.beginPath();
              context.lineCap = 'round';
              context.lineJoin = 'round';
              context.strokeStyle = paintColor;

              if (mode === Mode.SKETCH) {
                context.lineWidth = lineWidth;
                context.globalCompositeOperation = 'source-over';
              } else if (mode === Mode.ERASE) {
                // Make the eraser larger than the finer point brush used for
                // sketching.
                context.lineWidth = lineWidth * 5;
                context.globalCompositeOperation = 'destination-out';
              } else {
                console.error('Unexpected or empty mode.');
              }

              context.moveTo(lastPosition.x, lastPosition.y);
              context.lineTo(screenPosition.x, screenPosition.y);
              context.stroke();

              this.updateLastPosition(screenPosition);
            }
          }
        )
      );
    }
  );

  readonly startSketch = this.effect(
    (event$: Observable<MouseEvent | TouchEvent>) => {
      return combineLatest([event$, this.context$]).pipe(
        tap(([event, context]) => {
          event.preventDefault();
          this.updateIsSketching(true);

          const screenPosition = this.getEventPosition(event, context.canvas);
          this.updateLastPosition(screenPosition);
        })
      );
    }
  );

  readonly stopSketch = this.effect(
    (event$: Observable<MouseEvent | TouchEvent>) => {
      return event$.pipe(
        tap((event: Event) => {
          event.preventDefault();
          this.updateIsSketching(false);
        })
      );
    }
  );

  /**
   * +-------------------------------------------+
   * CLASS METHODS
   * +-------------------------------------------+
   */

  /**
   * Takes a mousemove or touchmove event and return the corresponding position
   * on the screen where the event occurred.
   */
  private getEventPosition(
    event: MouseEvent | TouchEvent,
    element: HTMLCanvasElement
  ): Point {
    const x =
      ((event as MouseEvent).pageX ??
        (event as TouchEvent).targetTouches[0].pageX) - element.offsetLeft;
    const y =
      ((event as MouseEvent).pageY ??
        (event as TouchEvent).targetTouches[0].pageY) - element.offsetTop;

    return {x, y};
  }

  /** Returns the size of a supplied element, minus its padding. */
  private getElementSizeMinusPadding(element: HTMLElement): Size {
    const computedStyle = this.window.getComputedStyle(element);
    const width =
      element.clientWidth -
      (parseFloat(computedStyle.paddingLeft) +
        parseFloat(computedStyle.paddingRight));
    const height =
      element.clientHeight -
      (parseFloat(computedStyle.paddingTop) +
        parseFloat(computedStyle.paddingBottom));
    return {width, height} as Size;
  }

  constructor() {
    super(INITIAL_STATE);
  }
}
