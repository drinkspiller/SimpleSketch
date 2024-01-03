import { OverlayRef } from '@angular/cdk/overlay';
import { ComponentStore } from '@ngrx/component-store';
import { Observable } from 'rxjs';
export interface SimpleSketchColorPickerState {
    clickStream: number;
    isVisible: boolean;
}
export declare const INITIAL_STATE: SimpleSketchColorPickerState;
export declare class SimpleSketchColorPickerStore extends ComponentStore<SimpleSketchColorPickerState> {
    private readonly overlayService;
    readonly mouseTrapOverlay: OverlayRef;
    private readonly mousetrapOverlayComponentPortal;
    /**
     * +-------------------------------------------+
     * SELECTORS
     * +-------------------------------------------+
     */
    readonly isVisible$: Observable<boolean>;
    /**
     * +-------------------------------------------+
     * UPDATERS
     * +-------------------------------------------+
     */
    readonly updateIsVisible: (observableOrValue: boolean | Observable<boolean>) => import("rxjs").Subscription;
    /**
     * +-------------------------------------------+
     * EFFECTS
     * +-------------------------------------------+
     */
    readonly hideOverlay: (observableOrValue?: void | Observable<void> | undefined) => import("rxjs").Subscription;
    readonly mouseTrapOverlayClickStream: (observableOrValue?: void | Observable<void> | undefined) => import("rxjs").Subscription;
    readonly showOverlay: (observableOrValue?: void | Observable<void> | undefined) => import("rxjs").Subscription;
    constructor();
}
