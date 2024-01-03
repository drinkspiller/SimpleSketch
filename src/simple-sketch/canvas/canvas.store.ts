import {Injectable, inject} from '@angular/core';
import {ComponentStore} from '@ngrx/component-store';
import {
  BehaviorSubject,
  Observable,
  combineLatest,
  debounceTime,
  filter,
  fromEvent,
  of,
  switchMap,
  takeUntil,
  tap,
} from 'rxjs';
import {WINDOW} from '../injection-tokens';

export enum Mode {
  ERASE = 'erase',
  SKETCH = 'sketch',
}

export interface SimpleSketchCanvasState {
  backgroundColor: string;
  canvasOffsetX: number;
  canvasOffsetY: number;
  isSketching: boolean;
  lineWidth: number;
  mode: Mode;
  paintColor: string;
  startX: number;
  startY: number;
}

export const INITIAL_STATE: SimpleSketchCanvasState = {
  backgroundColor: '#000000',
  canvasOffsetX: 0,
  canvasOffsetY: 0,
  isSketching: false,
  lineWidth: 5,
  mode: Mode.SKETCH,
  paintColor: '#ffffff',
  startX: 0,
  startY: 0,
};

@Injectable()
export class SimpleSketchCanvasStore extends ComponentStore<SimpleSketchCanvasState> {
  private canvas$ = new BehaviorSubject<HTMLCanvasElement | null>(null);
  private context$ = new BehaviorSubject<CanvasRenderingContext2D | null>(null);
  private window = inject(WINDOW);

  /**
   * +-------------------------------------------+
   * SELECTORS
   * +-------------------------------------------+
   */
  readonly backgroundColor$: Observable<string> = this.select(
    state => state.backgroundColor
  );

  readonly paintColor$: Observable<string> = this.select(
    state => state.paintColor
  );

  readonly canvasOffsetX$: Observable<number> = this.select(
    state => state.canvasOffsetX
  );

  readonly canvasOffsetY$: Observable<number> = this.select(
    state => state.canvasOffsetY
  );

  readonly isSketching$: Observable<boolean> = this.select(
    state => state.isSketching
  );

  readonly lineWidth$: Observable<number> = this.select(
    state => state.lineWidth
  );

  readonly mode$: Observable<Mode> = this.select(state => state.mode);

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

  readonly updateCanvasOffsetX = this.updater(
    (state, newCanvasOffsetX: number) => ({
      ...state,
      canvasOffsetX: newCanvasOffsetX,
    })
  );

  readonly updateCanvasOffsetY = this.updater(
    (state, newCanvasOffsetY: number) => ({
      ...state,
      canvasOffsetY: newCanvasOffsetY,
    })
  );

  readonly updatePaintColor = this.updater((state, newPaintColor: string) => ({
    ...state,
    paintColor: newPaintColor,
  }));

  readonly updateMode = this.updater((state, newMode: Mode) => ({
    ...state,
    mode: newMode,
  }));

  readonly updateStartX = this.updater((state, newStartX: number) => ({
    ...state,
    startX: newStartX,
  }));

  readonly updateStartY = this.updater((state, newStartY: number) => ({
    ...state,
    startY: newStartY,
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

          this.canvas$.next(canvas);
          this.context$.next(context);

          const hostElement = canvas.parentElement as HTMLElement;
          this.updateCanvasSize([
            hostElement.offsetWidth,
            hostElement.offsetHeight,
          ]);

          this.updateCanvasOffsetX(canvas.offsetLeft);
          this.updateCanvasOffsetY(canvas.offsetTop);
          this.updateBackGroundColor(backgroundColor);
          this.updatePaintColor(paintColor);

          this.applyBackgroundColor();

          fromEvent(this.window, 'resize')
            .pipe(takeUntil(this.destroy$), debounceTime(75))
            .subscribe(() => {
              this.updateCanvasSize([
                hostElement.offsetWidth,
                hostElement.offsetHeight,
              ]);
            });
        })
      );
    }
  );

  readonly sketch = this.effect(
    (event$: Observable<MouseEvent | TouchEvent>) => {
      return combineLatest([
        event$,
        this.context$,
        this.isSketching$,
        this.lineWidth$,
        this.canvasOffsetX$,
        this.canvasOffsetY$,
        this.paintColor$,
        this.mode$,
      ]).pipe(
        tap(
          ([
            event,
            context,
            isSketching,
            lineWidth,
            canvasOffsetX,
            canvasOffsetY,
            paintColor,
            mode,
          ]) => {
            if (!isSketching || context === null) return;
            context.globalCompositeOperation =
              mode === Mode.SKETCH ? 'source-over' : 'destination-out';
            context.lineWidth =
              mode === Mode.SKETCH ? lineWidth : lineWidth * 1.7;
            context.lineCap = 'round';
            context.strokeStyle = paintColor;

            const screenPosition = this.eventPosition(event);
            context.lineTo(
              screenPosition.x - canvasOffsetX,
              screenPosition.y - canvasOffsetY
            );
            context.stroke();
          }
        )
      );
    }
  );

  readonly startSketch = this.effect(
    (event$: Observable<MouseEvent | TouchEvent>) => {
      return event$.pipe(
        tap(event => {
          const screenPosition = this.eventPosition(event);

          this.updateIsSketching(true);
          this.updateStartX(screenPosition.x);
          this.updateStartY(screenPosition.y);
        })
      );
    }
  );

  readonly stopSketch = this.effect(
    (event$: Observable<MouseEvent | TouchEvent>) => {
      return combineLatest([event$, this.context$]).pipe(
        tap(([, context]) => {
          this.updateIsSketching(false);

          if (context === null) return;
          context.stroke();
          context.beginPath();
        })
      );
    }
  );

  readonly updateCanvasSize = this.effect(
    (args$: Observable<[number, number]>) => {
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

          // Now resize the canvas
          canvas!.width = width;
          canvas!.height = height;

          // Reapply saved contents/
          context!.putImageData(currentCanvasContent, 0, 0);
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
  private eventPosition(event: MouseEvent | TouchEvent): {
    x: number;
    y: number;
  } {
    const isTouchEvent = event instanceof TouchEvent;

    const newX = isTouchEvent
      ? (event as TouchEvent).touches[0].pageX
      : (event as MouseEvent).clientX;
    const newY = isTouchEvent
      ? (event as TouchEvent).touches[0].pageY
      : (event as MouseEvent).clientY;

    return {
      x: newX,
      y: newY,
    };
  }

  constructor() {
    super(INITIAL_STATE);
  }
}
