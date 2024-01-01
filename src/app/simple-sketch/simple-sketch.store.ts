import {Injectable} from '@angular/core';
import {ComponentStore} from '@ngrx/component-store';
import {BehaviorSubject, Observable, combineLatest, tap} from 'rxjs';

export interface SimpleSketchState {
  backgroundColor: string;
  canvasOffsetX: number;
  canvasOffsetY: number;
  isSketching: boolean;
  lineWidth: number;
  paintColor: string;
  startX: number;
  startY: number;
}

export const INITIAL_STATE: SimpleSketchState = {
  backgroundColor: '#000000',
  canvasOffsetX: 0,
  canvasOffsetY: 0,
  paintColor: '#ffffff',
  isSketching: false,
  lineWidth: 5,
  startX: 0,
  startY: 0,
};

@Injectable({
  providedIn: 'any',
})
export class SimpleSketchStore extends ComponentStore<SimpleSketchState> {
  private canvas = new BehaviorSubject<HTMLCanvasElement | null>(null);
  private context = new BehaviorSubject<CanvasRenderingContext2D | null>(null);

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
    return combineLatest([this.backgroundColor$, this.canvas]).pipe(
      tap(([color, canvas]) => {
        if (canvas) {
          canvas.style.backgroundColor = color;
        }
      })
    );
  });

  readonly init = this.effect(
    (data$: Observable<[HTMLCanvasElement, string, string]>) => {
      return data$.pipe(
        tap(([canvas, backgroundColor, paintColor]) => {
          const context = canvas.getContext('2d');

          this.canvas.next(canvas);
          this.context.next(context);

          const hostElement = canvas.parentElement as HTMLElement;
          canvas.width = hostElement.offsetWidth;
          canvas.height = hostElement.offsetHeight;

          this.updateCanvasOffsetX(canvas.offsetLeft);
          this.updateCanvasOffsetY(canvas.offsetTop);
          this.updateBackGroundColor(backgroundColor);
          console.log(`paintColor: ${paintColor}`);
          this.updatePaintColor(paintColor);

          this.applyBackgroundColor();
        })
      );
    }
  );

  readonly sketch = this.effect((event$: Observable<MouseEvent>) => {
    return combineLatest([
      event$,
      this.context,
      this.isSketching$,
      this.lineWidth$,
      this.canvasOffsetX$,
      this.paintColor$,
    ]).pipe(
      tap(
        ([
          event,
          context,
          isSketching,
          lineWidth,
          canvasOffsetX,
          paintColor,
        ]) => {
          if (!isSketching || context === null) return;

          context.lineWidth = lineWidth;
          context.lineCap = 'round';
          context.strokeStyle = paintColor;

          context.lineTo(event.clientX - canvasOffsetX, event.clientY);
          context.stroke();
        }
      )
    );
  });

  readonly startSketch = this.effect((event$: Observable<MouseEvent>) => {
    return event$.pipe(
      tap(event => {
        this.updateIsSketching(true);
        this.updateStartX(event.clientX);
        this.updateStartY(event.clientY);
      })
    );
  });

  readonly stopSketch = this.effect((event$: Observable<MouseEvent>) => {
    return combineLatest([event$, this.context]).pipe(
      tap(([, context]) => {
        this.updateIsSketching(false);

        if (context === null) return;
        context.stroke();
        context.beginPath();
      })
    );
  });

  constructor() {
    super(INITIAL_STATE);
  }
}
