import { Overlay } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { Injectable, inject } from '@angular/core';
import { ComponentStore } from '@ngrx/component-store';
import { combineLatest, tap } from 'rxjs';
import { ColorPickerMousetrapOverlayComponent } from './color-picker-mousetrap-overlay.component';
import * as i0 from "@angular/core";
const INITIAL_STATE = {
    isVisible: false,
};
export class SimpleSketchColorPickerStore extends ComponentStore {
    overlayService = inject(Overlay);
    mouseTrapOverlay = this.overlayService.create({
        backdropClass: 'simple-sketch-mousetrap-overlay',
        hasBackdrop: true,
        height: '100vh',
        width: '100vw',
    });
    mousetrapOverlayComponentPortal = new ComponentPortal(ColorPickerMousetrapOverlayComponent);
    /**
     * +-------------------------------------------+
     * SELECTORS
     * +-------------------------------------------+
     */
    isVisible$ = this.select(state => state.isVisible);
    /**
     * +-------------------------------------------+
     * UPDATERS
     * +-------------------------------------------+
     */
    updateIsVisible = this.updater((state, newIsVisible) => ({
        ...state,
        isVisible: newIsVisible,
    }));
    /**
     * +-------------------------------------------+
     * EFFECTS
     * +-------------------------------------------+
     */
    hideOverlay = this.effect(trigger$ => trigger$.pipe(tap(() => {
        this.mouseTrapOverlay.detach();
    })));
    mouseTrapOverlayClickStream = this.effect(trigger$ => {
        return combineLatest([
            trigger$,
            this.mouseTrapOverlay.backdropClick(),
        ]).pipe(tap(() => {
            this.hideOverlay();
            this.updateIsVisible(false);
        }));
    });
    showOverlay = this.effect(trigger$ => {
        return trigger$.pipe(tap(() => {
            this.mouseTrapOverlay.detach();
            this.mouseTrapOverlay.attach(this.mousetrapOverlayComponentPortal);
            this.mouseTrapOverlayClickStream();
        }));
    });
    constructor() {
        super(INITIAL_STATE);
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "17.0.8", ngImport: i0, type: SimpleSketchColorPickerStore, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
    static ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "17.0.8", ngImport: i0, type: SimpleSketchColorPickerStore, providedIn: SimpleSketchColorPickerStore });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "17.0.8", ngImport: i0, type: SimpleSketchColorPickerStore, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: SimpleSketchColorPickerStore,
                }]
        }], ctorParameters: () => [] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29sb3ItcGlja2VyLmNvbXBvbmVudC5zdG9yZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9zaW1wbGUtc2tldGNoL2NvbG9yLXBpY2tlci9jb2xvci1waWNrZXIuY29tcG9uZW50LnN0b3JlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBQyxPQUFPLEVBQWEsTUFBTSxzQkFBc0IsQ0FBQztBQUN6RCxPQUFPLEVBQUMsZUFBZSxFQUFDLE1BQU0scUJBQXFCLENBQUM7QUFDcEQsT0FBTyxFQUFDLFVBQVUsRUFBRSxNQUFNLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFDakQsT0FBTyxFQUFDLGNBQWMsRUFBQyxNQUFNLHVCQUF1QixDQUFDO0FBQ3JELE9BQU8sRUFBYSxhQUFhLEVBQUUsR0FBRyxFQUFDLE1BQU0sTUFBTSxDQUFDO0FBQ3BELE9BQU8sRUFBQyxvQ0FBb0MsRUFBQyxNQUFNLDRDQUE0QyxDQUFDOztBQU1oRyxNQUFNLGFBQWEsR0FBaUM7SUFDbEQsU0FBUyxFQUFFLEtBQUs7Q0FDakIsQ0FBQztBQUtGLE1BQU0sT0FBTyw0QkFBNkIsU0FBUSxjQUE0QztJQUMzRSxjQUFjLEdBQUcsTUFBTSxDQUFDLE9BQU8sQ0FBQyxDQUFDO0lBQ3pDLGdCQUFnQixHQUFlLElBQUksQ0FBQyxjQUFjLENBQUMsTUFBTSxDQUFDO1FBQ2pFLGFBQWEsRUFBRSxpQ0FBaUM7UUFDaEQsV0FBVyxFQUFFLElBQUk7UUFDakIsTUFBTSxFQUFFLE9BQU87UUFDZixLQUFLLEVBQUUsT0FBTztLQUNmLENBQUMsQ0FBQztJQUVjLCtCQUErQixHQUM5QyxJQUFJLGVBQWUsQ0FBQyxvQ0FBb0MsQ0FBQyxDQUFDO0lBRTVEOzs7O09BSUc7SUFDTSxVQUFVLEdBQXdCLElBQUksQ0FBQyxNQUFNLENBQ3BELEtBQUssQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDLFNBQVMsQ0FDekIsQ0FBQztJQUVGOzs7O09BSUc7SUFDTSxlQUFlLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLEtBQUssRUFBRSxZQUFxQixFQUFFLEVBQUUsQ0FBQyxDQUFDO1FBQ3pFLEdBQUcsS0FBSztRQUNSLFNBQVMsRUFBRSxZQUFZO0tBQ3hCLENBQUMsQ0FBQyxDQUFDO0lBRUo7Ozs7T0FJRztJQUNNLFdBQVcsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxFQUFFLENBQzVDLFFBQVEsQ0FBQyxJQUFJLENBQ1gsR0FBRyxDQUFDLEdBQUcsRUFBRTtRQUNQLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxNQUFNLEVBQUUsQ0FBQztJQUNqQyxDQUFDLENBQUMsQ0FDSCxDQUNGLENBQUM7SUFFTywyQkFBMkIsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxFQUFFO1FBQzVELE9BQU8sYUFBYSxDQUFDO1lBQ25CLFFBQVE7WUFDUixJQUFJLENBQUMsZ0JBQWdCLENBQUMsYUFBYSxFQUFFO1NBQ3RDLENBQUMsQ0FBQyxJQUFJLENBQ0wsR0FBRyxDQUFDLEdBQUcsRUFBRTtZQUNQLElBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQztZQUNuQixJQUFJLENBQUMsZUFBZSxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQzlCLENBQUMsQ0FBQyxDQUNILENBQUM7SUFDSixDQUFDLENBQUMsQ0FBQztJQUVNLFdBQVcsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxFQUFFO1FBQzVDLE9BQU8sUUFBUSxDQUFDLElBQUksQ0FDbEIsR0FBRyxDQUFDLEdBQUcsRUFBRTtZQUNQLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxNQUFNLEVBQUUsQ0FBQztZQUMvQixJQUFJLENBQUMsZ0JBQWdCLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQywrQkFBK0IsQ0FBQyxDQUFDO1lBRW5FLElBQUksQ0FBQywyQkFBMkIsRUFBRSxDQUFDO1FBQ3JDLENBQUMsQ0FBQyxDQUNILENBQUM7SUFDSixDQUFDLENBQUMsQ0FBQztJQUVIO1FBQ0UsS0FBSyxDQUFDLGFBQWEsQ0FBQyxDQUFDO0lBQ3ZCLENBQUM7dUdBckVVLDRCQUE0QjsyR0FBNUIsNEJBQTRCLGNBRjNCLDRCQUE0Qjs7MkZBRTdCLDRCQUE0QjtrQkFIeEMsVUFBVTttQkFBQztvQkFDVixVQUFVLDhCQUE4QjtpQkFDekMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge092ZXJsYXksIE92ZXJsYXlSZWZ9IGZyb20gJ0Bhbmd1bGFyL2Nkay9vdmVybGF5JztcbmltcG9ydCB7Q29tcG9uZW50UG9ydGFsfSBmcm9tICdAYW5ndWxhci9jZGsvcG9ydGFsJztcbmltcG9ydCB7SW5qZWN0YWJsZSwgaW5qZWN0fSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7Q29tcG9uZW50U3RvcmV9IGZyb20gJ0BuZ3J4L2NvbXBvbmVudC1zdG9yZSc7XG5pbXBvcnQge09ic2VydmFibGUsIGNvbWJpbmVMYXRlc3QsIHRhcH0gZnJvbSAncnhqcyc7XG5pbXBvcnQge0NvbG9yUGlja2VyTW91c2V0cmFwT3ZlcmxheUNvbXBvbmVudH0gZnJvbSAnLi9jb2xvci1waWNrZXItbW91c2V0cmFwLW92ZXJsYXkuY29tcG9uZW50JztcblxuZXhwb3J0IGludGVyZmFjZSBTaW1wbGVTa2V0Y2hDb2xvclBpY2tlclN0YXRlIHtcbiAgaXNWaXNpYmxlOiBib29sZWFuO1xufVxuXG5jb25zdCBJTklUSUFMX1NUQVRFOiBTaW1wbGVTa2V0Y2hDb2xvclBpY2tlclN0YXRlID0ge1xuICBpc1Zpc2libGU6IGZhbHNlLFxufTtcblxuQEluamVjdGFibGUoe1xuICBwcm92aWRlZEluOiBTaW1wbGVTa2V0Y2hDb2xvclBpY2tlclN0b3JlLFxufSlcbmV4cG9ydCBjbGFzcyBTaW1wbGVTa2V0Y2hDb2xvclBpY2tlclN0b3JlIGV4dGVuZHMgQ29tcG9uZW50U3RvcmU8U2ltcGxlU2tldGNoQ29sb3JQaWNrZXJTdGF0ZT4ge1xuICBwcml2YXRlIHJlYWRvbmx5IG92ZXJsYXlTZXJ2aWNlID0gaW5qZWN0KE92ZXJsYXkpO1xuICByZWFkb25seSBtb3VzZVRyYXBPdmVybGF5OiBPdmVybGF5UmVmID0gdGhpcy5vdmVybGF5U2VydmljZS5jcmVhdGUoe1xuICAgIGJhY2tkcm9wQ2xhc3M6ICdzaW1wbGUtc2tldGNoLW1vdXNldHJhcC1vdmVybGF5JyxcbiAgICBoYXNCYWNrZHJvcDogdHJ1ZSxcbiAgICBoZWlnaHQ6ICcxMDB2aCcsXG4gICAgd2lkdGg6ICcxMDB2dycsXG4gIH0pO1xuXG4gIHByaXZhdGUgcmVhZG9ubHkgbW91c2V0cmFwT3ZlcmxheUNvbXBvbmVudFBvcnRhbDogQ29tcG9uZW50UG9ydGFsPENvbG9yUGlja2VyTW91c2V0cmFwT3ZlcmxheUNvbXBvbmVudD4gPVxuICAgIG5ldyBDb21wb25lbnRQb3J0YWwoQ29sb3JQaWNrZXJNb3VzZXRyYXBPdmVybGF5Q29tcG9uZW50KTtcblxuICAvKipcbiAgICogKy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0rXG4gICAqIFNFTEVDVE9SU1xuICAgKiArLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLStcbiAgICovXG4gIHJlYWRvbmx5IGlzVmlzaWJsZSQ6IE9ic2VydmFibGU8Ym9vbGVhbj4gPSB0aGlzLnNlbGVjdChcbiAgICBzdGF0ZSA9PiBzdGF0ZS5pc1Zpc2libGVcbiAgKTtcblxuICAvKipcbiAgICogKy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0rXG4gICAqIFVQREFURVJTXG4gICAqICstLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tK1xuICAgKi9cbiAgcmVhZG9ubHkgdXBkYXRlSXNWaXNpYmxlID0gdGhpcy51cGRhdGVyKChzdGF0ZSwgbmV3SXNWaXNpYmxlOiBib29sZWFuKSA9PiAoe1xuICAgIC4uLnN0YXRlLFxuICAgIGlzVmlzaWJsZTogbmV3SXNWaXNpYmxlLFxuICB9KSk7XG5cbiAgLyoqXG4gICAqICstLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tK1xuICAgKiBFRkZFQ1RTXG4gICAqICstLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tK1xuICAgKi9cbiAgcmVhZG9ubHkgaGlkZU92ZXJsYXkgPSB0aGlzLmVmZmVjdCh0cmlnZ2VyJCA9PlxuICAgIHRyaWdnZXIkLnBpcGUoXG4gICAgICB0YXAoKCkgPT4ge1xuICAgICAgICB0aGlzLm1vdXNlVHJhcE92ZXJsYXkuZGV0YWNoKCk7XG4gICAgICB9KVxuICAgIClcbiAgKTtcblxuICByZWFkb25seSBtb3VzZVRyYXBPdmVybGF5Q2xpY2tTdHJlYW0gPSB0aGlzLmVmZmVjdCh0cmlnZ2VyJCA9PiB7XG4gICAgcmV0dXJuIGNvbWJpbmVMYXRlc3QoW1xuICAgICAgdHJpZ2dlciQsXG4gICAgICB0aGlzLm1vdXNlVHJhcE92ZXJsYXkuYmFja2Ryb3BDbGljaygpLFxuICAgIF0pLnBpcGUoXG4gICAgICB0YXAoKCkgPT4ge1xuICAgICAgICB0aGlzLmhpZGVPdmVybGF5KCk7XG4gICAgICAgIHRoaXMudXBkYXRlSXNWaXNpYmxlKGZhbHNlKTtcbiAgICAgIH0pXG4gICAgKTtcbiAgfSk7XG5cbiAgcmVhZG9ubHkgc2hvd092ZXJsYXkgPSB0aGlzLmVmZmVjdCh0cmlnZ2VyJCA9PiB7XG4gICAgcmV0dXJuIHRyaWdnZXIkLnBpcGUoXG4gICAgICB0YXAoKCkgPT4ge1xuICAgICAgICB0aGlzLm1vdXNlVHJhcE92ZXJsYXkuZGV0YWNoKCk7XG4gICAgICAgIHRoaXMubW91c2VUcmFwT3ZlcmxheS5hdHRhY2godGhpcy5tb3VzZXRyYXBPdmVybGF5Q29tcG9uZW50UG9ydGFsKTtcblxuICAgICAgICB0aGlzLm1vdXNlVHJhcE92ZXJsYXlDbGlja1N0cmVhbSgpO1xuICAgICAgfSlcbiAgICApO1xuICB9KTtcblxuICBjb25zdHJ1Y3RvcigpIHtcbiAgICBzdXBlcihJTklUSUFMX1NUQVRFKTtcbiAgfVxufVxuIl19