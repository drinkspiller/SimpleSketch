import { OverlayRef } from '@angular/cdk/overlay';
import { ComponentStore } from '@ngrx/component-store';
import { Observable } from 'rxjs';
import * as i0 from "@angular/core";
export interface SimpleSketchColorPickerState {
    clickStream: number;
    isVisible: boolean;
}
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
    readonly hideOverlay: (observableOrValue?: void | Observable<void>) => import("rxjs").Subscription;
    readonly mouseTrapOverlayClickStream: (observableOrValue?: void | Observable<void>) => import("rxjs").Subscription;
    readonly showOverlay: (observableOrValue?: void | Observable<void>) => import("rxjs").Subscription;
    constructor();
    static ɵfac: i0.ɵɵFactoryDeclaration<SimpleSketchColorPickerStore, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<SimpleSketchColorPickerStore>;
}
