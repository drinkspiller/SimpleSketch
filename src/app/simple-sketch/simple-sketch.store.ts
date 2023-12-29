import {Injectable} from '@angular/core';
import {ComponentStore} from '@ngrx/component-store';
import {Observable, combineLatest, tap} from 'rxjs';

export interface SimpleSketchState {
  canvasBackgroundColor: string;
  canvasOffsetX: number;
  canvasOffsetY: number;
  canvasPaintColor: string;
  isPainting: boolean;
  lineWidth: number;
  startX: number;
  startY: number;
}

export const INITIAL_STATE: SimpleSketchState = {
  canvasBackgroundColor: '#000',
  canvasOffsetX: 0,
  canvasOffsetY: 0,
  canvasPaintColor: '#fff',
  isPainting: false,
  lineWidth: 5,
  startX: 0,
  startY: 0,
};

@Injectable({
  providedIn: 'root',
})
export class SimpleSketchStore extends ComponentStore<SimpleSketchState> {
  private context: CanvasRenderingContext2D | null = null;

  // Selectors
  readonly canvasOffsetX$: Observable<number> = this.select(
    state => state.canvasOffsetX
  );

  readonly canvasOffsetY$: Observable<number> = this.select(
    state => state.canvasOffsetY
  );

  readonly isPainting$: Observable<boolean> = this.select(
    state => state.isPainting
  );

  readonly lineWidth$: Observable<number> = this.select(
    state => state.lineWidth
  );

  // Updaters
  readonly updateIsPainting = this.updater((state, isPainting: boolean) => ({
    ...state,
    isPainting,
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

  readonly updateStartX = this.updater((state, newStartX: number) => ({
    ...state,
    startX: newStartX,
  }));

  readonly updateStartY = this.updater((state, newStartY: number) => ({
    ...state,
    startY: newStartY,
  }));

  // Effects
  readonly init = this.effect((canvas$: Observable<HTMLCanvasElement>) => {
    return canvas$.pipe(
      tap(canvas => {
        this.context = canvas.getContext('2d');

        const hostElement = canvas.parentElement as HTMLElement;
        canvas.width = hostElement.offsetWidth;
        canvas.height = hostElement.offsetHeight;

        this.updateCanvasOffsetX(canvas.offsetLeft);
        this.updateCanvasOffsetY(canvas.offsetTop);
      })
    );
  });

  readonly startSketch = this.effect((event$: Observable<MouseEvent>) => {
    return event$.pipe(
      tap(event => {
        this.updateIsPainting(true);
        this.updateStartX(event.clientX);
        this.updateStartY(event.clientY);
      })
    );
  });

  readonly stopSketch = this.effect((event$: Observable<MouseEvent>) => {
    return event$.pipe(
      tap(() => {
        this.updateIsPainting(false);

        if (this.context === null) return;
        this.context.stroke();
        this.context.beginPath();
      })
    );
  });

  readonly sketch = this.effect((event$: Observable<MouseEvent>) => {
    return combineLatest([
      event$,
      this.isPainting$,
      this.lineWidth$,
      this.canvasOffsetX$,
    ]).pipe(
      tap(([event, isPainting, lineWidth, canvasOffsetX]) => {
        if (!isPainting || this.context === null) return;

        this.context.lineWidth = lineWidth;
        this.context.lineCap = 'round';

        this.context.lineTo(event.clientX - canvasOffsetX, event.clientY);
        this.context.stroke();
      })
    );
  });

  constructor() {
    super(INITIAL_STATE);
  }
}
