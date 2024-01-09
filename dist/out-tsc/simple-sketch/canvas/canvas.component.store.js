import { __decorate } from "tslib";
import { Injectable, inject } from '@angular/core';
import { ComponentStore } from '@ngrx/component-store';
import { ReplaySubject, combineLatest, debounceTime, filter, fromEvent, of, switchMap, takeUntil, tap, withLatestFrom, } from 'rxjs';
import { WINDOW } from '../injection-tokens';
import { Mode } from '../toolbar/toolbar.component';
const INITIAL_STATE = {
    backgroundColor: '#000000',
    isSketching: false,
    lastX: 0,
    lastY: 0,
    lineWidth: 5,
    mode: Mode.SKETCH,
    paintColor: '#ffffff',
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
    getEventPosition(event, element) {
        const x = (event.pageX ??
            event.targetTouches[0].pageX) - element.offsetLeft;
        const y = (event.pageY ??
            event.targetTouches[0].pageY) - element.offsetTop;
        return { x, y };
    }
    /** Returns the size of a supplied element, minus its padding. */
    getElementSizeMinusPadding(element) {
        const computedStyle = this.window.getComputedStyle(element);
        const width = element.clientWidth -
            (parseFloat(computedStyle.paddingLeft) +
                parseFloat(computedStyle.paddingRight));
        const height = element.clientHeight -
            (parseFloat(computedStyle.paddingTop) +
                parseFloat(computedStyle.paddingBottom));
        return { width, height };
    }
    constructor() {
        super(INITIAL_STATE);
        this.canvas$ = new ReplaySubject(1);
        this.context$ = new ReplaySubject(1);
        this.window = inject(WINDOW);
        /**
         * +-------------------------------------------+
         * SELECTORS
         * +-------------------------------------------+
         */
        this.backgroundColor$ = this.select(state => state.backgroundColor);
        this.isSketching$ = this.select(state => state.isSketching);
        this.lineWidth$ = this.select(state => state.lineWidth);
        this.mode$ = this.select(state => state.mode);
        this.paintColor$ = this.select(state => state.paintColor);
        this.lastPosition$ = this.select(state => ({
            x: state.lastX,
            y: state.lastY,
        }));
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
        this.updatePaintColor = this.updater((state, newPaintColor) => ({
            ...state,
            paintColor: newPaintColor,
        }));
        this.updateMode = this.updater((state, newMode) => ({
            ...state,
            mode: newMode,
        }));
        this.updateLastPosition = this.updater((state, newPosition) => ({
            ...state,
            lastX: newPosition.x,
            lastY: newPosition.y,
        }));
        /**
         * +-------------------------------------------+
         * EFFECTS
         * +-------------------------------------------+
         */
        this.applyBackgroundColor = this.effect((trigger$) => {
            return combineLatest([
                trigger$,
                this.backgroundColor$,
                this.canvas$,
            ]).pipe(tap(([, color, canvas]) => {
                if (canvas) {
                    canvas.style.backgroundColor = color;
                }
            }));
        });
        this.clearCanvas = this.effect((trigger$) => combineLatest([trigger$, this.context$, this.canvas$]).pipe(tap(([, context, canvas]) => {
            if (context && canvas) {
                context.clearRect(0, 0, canvas.width, canvas.height);
            }
        })));
        this.init = this.effect((initData$) => {
            return initData$.pipe(tap(([canvas, backgroundColor, paintColor]) => {
                const context = canvas.getContext('2d');
                // Initialize canvas & context properties using the supplied `canvas`.
                this.canvas$.next(canvas);
                this.context$.next(context);
                // Canvases must have their width and height pixel values set. The
                // canvas' _parent (`.canvas-wrapper`), flexes to grow to the
                // available space. Set the actual canvas element to the pixel
                // dimensions available inside its parent.
                const canvasWrapper = canvas.parentElement;
                const canvasWrapperSize = this.getElementSizeMinusPadding(canvasWrapper);
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
                    const canvasWrapperSize = this.getElementSizeMinusPadding(canvasWrapper);
                    this.resizeCanvas([
                        canvasWrapperSize.width,
                        canvasWrapperSize.height,
                    ]);
                });
            }));
        });
        this.resizeCanvas = this.effect((resizeData$) => {
            return resizeData$.pipe(switchMap(([width, height]) => {
                return combineLatest([
                    this.canvas$,
                    this.context$,
                    of(width),
                    of(height),
                ]);
            }), filter(
            /* eslint-disable @typescript-eslint/no-unused-vars */
            ([canvas, context, width, height]) => canvas !== null && context !== null), tap(([canvas, context, width, height]) => {
                // Resizing the canvas will clear its contents, so store the current
                // canvas contents before resizing so they can be restored after.
                const currentCanvasContent = context.getImageData(0, 0, canvas.width, canvas.height);
                // Now resize the canvas.
                canvas.width = width;
                canvas.height = height;
                // Reapply saved contents.
                context.putImageData(currentCanvasContent, 0, 0);
            }));
        });
        this.sketch = this.effect((event$) => {
            return event$.pipe(withLatestFrom(this.context$, this.isSketching$, this.lineWidth$, this.paintColor$, this.mode$, this.lastPosition$), tap(([event, context, isSketching, lineWidth, paintColor, mode, lastPosition,]) => {
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
                    }
                    else if (mode === Mode.ERASE) {
                        // Make the eraser larger than the finer point brush used for
                        // sketching.
                        context.lineWidth = lineWidth * 5;
                        context.globalCompositeOperation = 'destination-out';
                    }
                    else {
                        console.error('Unexpected or empty mode.');
                    }
                    context.moveTo(lastPosition.x, lastPosition.y);
                    context.lineTo(screenPosition.x, screenPosition.y);
                    context.stroke();
                    this.updateLastPosition(screenPosition);
                }
            }));
        });
        this.startSketch = this.effect((event$) => {
            return combineLatest([event$, this.context$]).pipe(tap(([event, context]) => {
                event.preventDefault();
                this.updateIsSketching(true);
                const screenPosition = this.getEventPosition(event, context.canvas);
                this.updateLastPosition(screenPosition);
            }));
        });
        this.stopSketch = this.effect((event$) => {
            return event$.pipe(tap((event) => {
                event.preventDefault();
                this.updateIsSketching(false);
            }));
        });
    }
};
SimpleSketchCanvasStore = __decorate([
    Injectable()
], SimpleSketchCanvasStore);
export { SimpleSketchCanvasStore };
//# sourceMappingURL=canvas.component.store.js.map