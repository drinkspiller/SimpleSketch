import {Injectable} from '@angular/core';
import {ComponentStore} from '@ngrx/component-store';
import {BehaviorSubject, Observable, combineLatest, tap} from 'rxjs';
import {SimpleSketchComponent} from './simple-sketch.component';

export interface SimpleSketchState {
  canvasBackgroundColor: string;
  canvasOffsetX: number;
  canvasOffsetY: number;
  canvasPaintColor: string;
  isSketching: boolean;
  lineWidth: number;
  startX: number;
  startY: number;
}

export const INITIAL_STATE: SimpleSketchState = {
  canvasBackgroundColor: '#000000',
  canvasOffsetX: 0,
  canvasOffsetY: 0,
  canvasPaintColor: '#ffffff',
  isSketching: false,
  lineWidth: 5,
  startX: 0,
  startY: 0,
};

@Injectable({
  providedIn: SimpleSketchComponent,
})
export class SimpleSketchStore extends ComponentStore<SimpleSketchState> {
  private canvas = new BehaviorSubject<HTMLCanvasElement | null>(null);

  private context = new BehaviorSubject<CanvasRenderingContext2D | null>(null);

  // Selectors
  readonly canvasBackgroundColor$: Observable<string> = this.select(
    state => state.canvasBackgroundColor
  );

  readonly canvasPaintColor$: Observable<string> = this.select(
    state => state.canvasPaintColor
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

  // Updaters
  readonly updateBackGroundColor = this.updater(
    (state, newBackgroundColor: string) => ({
      ...state,
      canvasBackgroundColor: newBackgroundColor,
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
    canvasPaintColor: newPaintColor,
  }));

  readonly updateStartX = this.updater((state, newStartX: number) => ({
    ...state,
    startX: newStartX,
  }));

  readonly updateStartY = this.updater((state, newStartY: number) => ({
    ...state,
    startY: newStartY,
  }));

  // Effects
  readonly applyCanvasBackgroundColor = this.effect(() => {
    return combineLatest([this.canvasBackgroundColor$, this.canvas]).pipe(
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

          this.applyCanvasBackgroundColor();
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
      this.canvasPaintColor$,
    ]).pipe(
      tap(
        ([
          event,
          context,
          isSketching,
          lineWidth,
          canvasOffsetX,
          canvasPaintColor,
        ]) => {
          if (!isSketching || context === null) return;

          context.lineWidth = lineWidth;
          context.lineCap = 'round';
          context.strokeStyle = canvasPaintColor;

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
