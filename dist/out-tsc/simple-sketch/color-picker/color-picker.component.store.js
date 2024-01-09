import { __decorate } from "tslib";
import { Overlay } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { Injectable, inject } from '@angular/core';
import { ComponentStore } from '@ngrx/component-store';
import { combineLatest, tap } from 'rxjs';
import { ColorPickerMousetrapOverlayComponent } from './color-picker-mousetrap-overlay.component';
const INITIAL_STATE = {
    isVisible: false,
};
let SimpleSketchColorPickerStore = class SimpleSketchColorPickerStore extends ComponentStore {
    constructor() {
        super(INITIAL_STATE);
        this.overlayService = inject(Overlay);
        this.mouseTrapOverlay = this.overlayService.create({
            backdropClass: 'simple-sketch-mousetrap-overlay',
            hasBackdrop: true,
            height: '100vh',
            width: '100vw',
        });
        this.mousetrapOverlayComponentPortal = new ComponentPortal(ColorPickerMousetrapOverlayComponent);
        /**
         * +-------------------------------------------+
         * SELECTORS
         * +-------------------------------------------+
         */
        this.isVisible$ = this.select(state => state.isVisible);
        /**
         * +-------------------------------------------+
         * UPDATERS
         * +-------------------------------------------+
         */
        this.updateIsVisible = this.updater((state, newIsVisible) => ({
            ...state,
            isVisible: newIsVisible,
        }));
        /**
         * +-------------------------------------------+
         * EFFECTS
         * +-------------------------------------------+
         */
        this.hideOverlay = this.effect(trigger$ => trigger$.pipe(tap(() => {
            this.mouseTrapOverlay.detach();
        })));
        this.mouseTrapOverlayClickStream = this.effect(trigger$ => {
            return combineLatest([
                trigger$,
                this.mouseTrapOverlay.backdropClick(),
            ]).pipe(tap(() => {
                this.hideOverlay();
                this.updateIsVisible(false);
            }));
        });
        this.showOverlay = this.effect(trigger$ => {
            return trigger$.pipe(tap(() => {
                this.mouseTrapOverlay.detach();
                this.mouseTrapOverlay.attach(this.mousetrapOverlayComponentPortal);
                this.mouseTrapOverlayClickStream();
            }));
        });
    }
};
SimpleSketchColorPickerStore = __decorate([
    Injectable({
        providedIn: SimpleSketchColorPickerStore,
    })
], SimpleSketchColorPickerStore);
export { SimpleSketchColorPickerStore };
//# sourceMappingURL=color-picker.component.store.js.map