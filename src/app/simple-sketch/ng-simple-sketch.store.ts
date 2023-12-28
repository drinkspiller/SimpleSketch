import {Injectable} from '@angular/core';
import {ComponentStore} from '@ngrx/component-store';
import {Observable, tap} from 'rxjs';

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
export class NgSimpleSketchStore extends ComponentStore<SimpleSketchState> {
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
  readonly init = this.effect(
    (data$: Observable<[HTMLCanvasElement, string, string]>) => {
      return data$.pipe(
        tap(([canvas, width, height]) => {
          canvas.style.width = width;
          canvas.style.height = height;

          canvas.width = window.innerWidth;
          canvas.height = window.innerHeight;

          this.updateCanvasOffsetX(canvas.offsetLeft);
          this.updateCanvasOffsetY(canvas.offsetTop);
        })
      );
    }
  );

  constructor() {
    super(INITIAL_STATE);
  }
}
