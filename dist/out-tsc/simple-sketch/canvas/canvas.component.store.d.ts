import { ComponentStore } from '@ngrx/component-store';
import { Observable } from 'rxjs';
import { Mode } from '../toolbar/toolbar.component';
export interface SimpleSketchCanvasState {
    backgroundColor: string;
    isSketching: boolean;
    lastX: number;
    lastY: number;
    lineWidth: number;
    mode: Mode;
    paintColor: string;
}
export interface Point {
    x: number;
    y: number;
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
    readonly isSketching$: Observable<boolean>;
    readonly lineWidth$: Observable<number>;
    readonly mode$: Observable<Mode>;
    readonly paintColor$: Observable<string>;
    readonly lastPosition$: Observable<Point>;
    /**
     * +-------------------------------------------+
     * UPDATERS
     * +-------------------------------------------+
     */
    readonly updateBackGroundColor: (observableOrValue: string | Observable<string>) => import("rxjs").Subscription;
    readonly updateIsSketching: (observableOrValue: boolean | Observable<boolean>) => import("rxjs").Subscription;
    readonly updatePaintColor: (observableOrValue: string | Observable<string>) => import("rxjs").Subscription;
    readonly updateMode: (observableOrValue: Mode | Observable<Mode>) => import("rxjs").Subscription;
    readonly updateLastPosition: (observableOrValue: Point | Observable<Point>) => import("rxjs").Subscription;
    /**
     * +-------------------------------------------+
     * EFFECTS
     * +-------------------------------------------+
     */
    readonly applyBackgroundColor: (observableOrValue?: void | Observable<void> | undefined) => import("rxjs").Subscription;
    readonly clearCanvas: (observableOrValue?: void | Observable<void> | undefined) => import("rxjs").Subscription;
    readonly init: (observableOrValue: [HTMLCanvasElement, string, string] | Observable<[HTMLCanvasElement, string, string]>) => import("rxjs").Subscription;
    readonly resizeCanvas: (observableOrValue: [number, number] | Observable<[number, number]>) => import("rxjs").Subscription;
    readonly sketch: (observableOrValue: MouseEvent | TouchEvent | Observable<MouseEvent | TouchEvent>) => import("rxjs").Subscription;
    readonly startSketch: (observableOrValue: MouseEvent | TouchEvent | Observable<MouseEvent | TouchEvent>) => import("rxjs").Subscription;
    readonly stopSketch: (observableOrValue: MouseEvent | TouchEvent | Observable<MouseEvent | TouchEvent>) => import("rxjs").Subscription;
    /**
     * +-------------------------------------------+
     * CLASS METHODS
     * +-------------------------------------------+
     */
    /**
     * Takes a mousemove or touchmove event and return the corresponding position
     * on the screen where the event occurred.
     */
    private getEventPosition;
    /** Returns the size of a supplied element, minus its padding. */
    private getElementSizeMinusPadding;
    constructor();
}
