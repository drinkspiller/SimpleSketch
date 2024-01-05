import { ComponentStore } from '@ngrx/component-store';
import { Observable } from 'rxjs';
import * as i0 from "@angular/core";
export declare enum Mode {
    ERASE = "erase",
    SKETCH = "sketch"
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
export interface Size {
    height: number;
    width: number;
}
export declare class SimpleSketchCanvasStore extends ComponentStore<SimpleSketchCanvasState> {
    private canvas$;
    private context$;
    private window;
    /**
     * +-------------------------------------------+
     * SELECTORS
     * +-------------------------------------------+
     */
    readonly backgroundColor$: Observable<string>;
    readonly paintColor$: Observable<string>;
    readonly canvasOffsetX$: Observable<number>;
    readonly canvasOffsetY$: Observable<number>;
    readonly isSketching$: Observable<boolean>;
    readonly lineWidth$: Observable<number>;
    readonly mode$: Observable<Mode>;
    /**
     * +-------------------------------------------+
     * UPDATERS
     * +-------------------------------------------+
     */
    readonly updateBackGroundColor: (observableOrValue: string | Observable<string>) => import("rxjs").Subscription;
    readonly updateIsSketching: (observableOrValue: boolean | Observable<boolean>) => import("rxjs").Subscription;
    readonly updateCanvasOffsetX: (observableOrValue: number | Observable<number>) => import("rxjs").Subscription;
    readonly updateCanvasOffsetY: (observableOrValue: number | Observable<number>) => import("rxjs").Subscription;
    readonly updatePaintColor: (observableOrValue: string | Observable<string>) => import("rxjs").Subscription;
    readonly updateMode: (observableOrValue: Mode | Observable<Mode>) => import("rxjs").Subscription;
    readonly updateStartX: (observableOrValue: number | Observable<number>) => import("rxjs").Subscription;
    readonly updateStartY: (observableOrValue: number | Observable<number>) => import("rxjs").Subscription;
    /**
     * +-------------------------------------------+
     * EFFECTS
     * +-------------------------------------------+
     */
    readonly applyBackgroundColor: (observableOrValue?: void | Observable<void>) => import("rxjs").Subscription;
    readonly clearCanvas: (observableOrValue?: void | Observable<void>) => import("rxjs").Subscription;
    readonly init: (observableOrValue: [HTMLCanvasElement, string, string] | Observable<[HTMLCanvasElement, string, string]>) => import("rxjs").Subscription;
    readonly sketch: (observableOrValue: MouseEvent | TouchEvent | Observable<MouseEvent | TouchEvent>) => import("rxjs").Subscription;
    readonly startSketch: (observableOrValue: MouseEvent | TouchEvent | Observable<MouseEvent | TouchEvent>) => import("rxjs").Subscription;
    readonly stopSketch: (observableOrValue: MouseEvent | TouchEvent | Observable<MouseEvent | TouchEvent>) => import("rxjs").Subscription;
    readonly updateCanvasSize: (observableOrValue: [number, number] | Observable<[number, number]>) => import("rxjs").Subscription;
    /**
     * +-------------------------------------------+
     * CLASS METHODS
     * +-------------------------------------------+
     */
    /**
     * Takes a mousemove or touchmove event and return the corresponding position
     * on the screen where the event occurred.
     */
    private eventPosition;
    private getElementSizeMinusPadding;
    constructor();
    static ɵfac: i0.ɵɵFactoryDeclaration<SimpleSketchCanvasStore, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<SimpleSketchCanvasStore>;
}
