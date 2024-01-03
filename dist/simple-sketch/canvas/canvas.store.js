import { __decorate } from "tslib";
import { Injectable, inject } from '@angular/core';
import { ComponentStore } from '@ngrx/component-store';
import { BehaviorSubject, combineLatest, debounceTime, filter, fromEvent, of, switchMap, takeUntil, tap, } from 'rxjs';
import { WINDOW } from '../injection-tokens';
export var Mode;
(function (Mode) {
    Mode["ERASE"] = "erase";
    Mode["SKETCH"] = "sketch";
})(Mode || (Mode = {}));
export const INITIAL_STATE = {
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
let SimpleSketchCanvasStore = class SimpleSketchCanvasStore extends ComponentStore {
    /**
     * +-------------------------------------------+
     * CLASS METHODS
     * +-------------------------------------------+
     */
    /**
     * Takes a mousemove or touchmove event and return the corresponding position
     * on the screen where the event occurred.
     */
    eventPosition(event) {
        const isTouchEvent = event instanceof TouchEvent;
        const newX = isTouchEvent
            ? event.touches[0].pageX
            : event.clientX;
        const newY = isTouchEvent
            ? event.touches[0].pageY
            : event.clientY;
        return {
            x: newX,
            y: newY,
        };
    }
    constructor() {
        super(INITIAL_STATE);
        this.canvas$ = new BehaviorSubject(null);
        this.context$ = new BehaviorSubject(null);
        this.window = inject(WINDOW);
        /**
         * +-------------------------------------------+
         * SELECTORS
         * +-------------------------------------------+
         */
        this.backgroundColor$ = this.select(state => state.backgroundColor);
        this.paintColor$ = this.select(state => state.paintColor);
        this.canvasOffsetX$ = this.select(state => state.canvasOffsetX);
        this.canvasOffsetY$ = this.select(state => state.canvasOffsetY);
        this.isSketching$ = this.select(state => state.isSketching);
        this.lineWidth$ = this.select(state => state.lineWidth);
        this.mode$ = this.select(state => state.mode);
        /**
         * +-------------------------------------------+
         * UPDATERS
         * +-------------------------------------------+
         */
        this.updateBackGroundColor = this.updater((state, newBackgroundColor) => ({
            ...state,
            backgroundColor: newBackgroundColor,
        }));
        this.updateIsSketching = this.updater((state, isSketching) => ({
            ...state,
            isSketching,
        }));
        this.updateCanvasOffsetX = this.updater((state, newCanvasOffsetX) => ({
            ...state,
            canvasOffsetX: newCanvasOffsetX,
        }));
        this.updateCanvasOffsetY = this.updater((state, newCanvasOffsetY) => ({
            ...state,
            canvasOffsetY: newCanvasOffsetY,
        }));
        this.updatePaintColor = this.updater((state, newPaintColor) => ({
            ...state,
            paintColor: newPaintColor,
        }));
        this.updateMode = this.updater((state, newMode) => ({
            ...state,
            mode: newMode,
        }));
        this.updateStartX = this.updater((state, newStartX) => ({
            ...state,
            startX: newStartX,
        }));
        this.updateStartY = this.updater((state, newStartY) => ({
            ...state,
            startY: newStartY,
        }));
        /**
         * +-------------------------------------------+
         * EFFECTS
         * +-------------------------------------------+
         */
        this.applyBackgroundColor = this.effect(() => {
            return combineLatest([this.backgroundColor$, this.canvas$]).pipe(tap(([color, canvas]) => {
                if (canvas) {
                    canvas.style.backgroundColor = color;
                }
            }));
        });
        this.clearCanvas = this.effect(trigger$ => combineLatest([trigger$, this.context$, this.canvas$]).pipe(tap(([, context, canvas]) => {
            if (context && canvas) {
                context.clearRect(0, 0, canvas.width, canvas.height);
            }
        })));
        this.init = this.effect((data$) => {
            return data$.pipe(tap(([canvas, backgroundColor, paintColor]) => {
                const context = canvas.getContext('2d');
                this.canvas$.next(canvas);
                this.context$.next(context);
                const hostElement = canvas.parentElement;
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
            }));
        });
        this.sketch = this.effect((event$) => {
            return combineLatest([
                event$,
                this.context$,
                this.isSketching$,
                this.lineWidth$,
                this.canvasOffsetX$,
                this.canvasOffsetY$,
                this.paintColor$,
                this.mode$,
            ]).pipe(tap(([event, context, isSketching, lineWidth, canvasOffsetX, canvasOffsetY, paintColor, mode,]) => {
                if (!isSketching || context === null)
                    return;
                context.globalCompositeOperation =
                    mode === Mode.SKETCH ? 'source-over' : 'destination-out';
                context.lineWidth =
                    mode === Mode.SKETCH ? lineWidth : lineWidth * 1.7;
                context.lineCap = 'round';
                context.strokeStyle = paintColor;
                const screenPosition = this.eventPosition(event);
                context.lineTo(screenPosition.x - canvasOffsetX, screenPosition.y - canvasOffsetY);
                context.stroke();
            }));
        });
        this.startSketch = this.effect((event$) => {
            return event$.pipe(tap(event => {
                const screenPosition = this.eventPosition(event);
                this.updateIsSketching(true);
                this.updateStartX(screenPosition.x);
                this.updateStartY(screenPosition.y);
            }));
        });
        this.stopSketch = this.effect((event$) => {
            return combineLatest([event$, this.context$]).pipe(tap(([, context]) => {
                this.updateIsSketching(false);
                if (context === null)
                    return;
                context.stroke();
                context.beginPath();
            }));
        });
        this.updateCanvasSize = this.effect((args$) => {
            return args$.pipe(switchMap(([width, height]) => {
                return combineLatest([
                    this.canvas$,
                    this.context$,
                    of(width),
                    of(height),
                ]);
            }), filter(([canvas, context, width, height]) => canvas !== null && context !== null), tap(([canvas, context, width, height]) => {
                // Resizing the canvas will clear its contents, so store the current
                // canvas contents before resizing so they can be restored after.
                const currentCanvasContent = context.getImageData(0, 0, canvas.width, canvas.height);
                // Now resize the canvas
                canvas.width = width;
                canvas.height = height;
                // Reapply saved contents/
                context.putImageData(currentCanvasContent, 0, 0);
            }));
        });
    }
};
SimpleSketchCanvasStore = __decorate([
    Injectable()
], SimpleSketchCanvasStore);
export { SimpleSketchCanvasStore };
//# sourceMappingURL=canvas.store.js.map