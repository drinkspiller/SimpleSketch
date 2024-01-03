import { Overlay } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { Injectable, inject } from '@angular/core';
import { ComponentStore } from '@ngrx/component-store';
import { combineLatest, tap } from 'rxjs';
import { ColorPickerMousetrapOverlayComponent } from './color-picker-mousetrap-overlay.component';
import * as i0 from "@angular/core";
const INITIAL_STATE = {
    clickStream: 0,
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29sb3ItcGlja2VyLnN0b3JlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL3NpbXBsZS1za2V0Y2gvY29sb3ItcGlja2VyL2NvbG9yLXBpY2tlci5zdG9yZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUMsT0FBTyxFQUFhLE1BQU0sc0JBQXNCLENBQUM7QUFDekQsT0FBTyxFQUFDLGVBQWUsRUFBQyxNQUFNLHFCQUFxQixDQUFDO0FBQ3BELE9BQU8sRUFBQyxVQUFVLEVBQUUsTUFBTSxFQUFDLE1BQU0sZUFBZSxDQUFDO0FBQ2pELE9BQU8sRUFBQyxjQUFjLEVBQUMsTUFBTSx1QkFBdUIsQ0FBQztBQUNyRCxPQUFPLEVBQWEsYUFBYSxFQUFFLEdBQUcsRUFBQyxNQUFNLE1BQU0sQ0FBQztBQUNwRCxPQUFPLEVBQUMsb0NBQW9DLEVBQUMsTUFBTSw0Q0FBNEMsQ0FBQzs7QUFPaEcsTUFBTSxhQUFhLEdBQWlDO0lBQ2xELFdBQVcsRUFBRSxDQUFDO0lBQ2QsU0FBUyxFQUFFLEtBQUs7Q0FDakIsQ0FBQztBQUtGLE1BQU0sT0FBTyw0QkFBNkIsU0FBUSxjQUE0QztJQUMzRSxjQUFjLEdBQUcsTUFBTSxDQUFDLE9BQU8sQ0FBQyxDQUFDO0lBQ3pDLGdCQUFnQixHQUFlLElBQUksQ0FBQyxjQUFjLENBQUMsTUFBTSxDQUFDO1FBQ2pFLGFBQWEsRUFBRSxpQ0FBaUM7UUFDaEQsV0FBVyxFQUFFLElBQUk7UUFDakIsTUFBTSxFQUFFLE9BQU87UUFDZixLQUFLLEVBQUUsT0FBTztLQUNmLENBQUMsQ0FBQztJQUVjLCtCQUErQixHQUM5QyxJQUFJLGVBQWUsQ0FBQyxvQ0FBb0MsQ0FBQyxDQUFDO0lBRTVEOzs7O09BSUc7SUFDTSxVQUFVLEdBQXdCLElBQUksQ0FBQyxNQUFNLENBQ3BELEtBQUssQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDLFNBQVMsQ0FDekIsQ0FBQztJQUVGOzs7O09BSUc7SUFDTSxlQUFlLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLEtBQUssRUFBRSxZQUFxQixFQUFFLEVBQUUsQ0FBQyxDQUFDO1FBQ3pFLEdBQUcsS0FBSztRQUNSLFNBQVMsRUFBRSxZQUFZO0tBQ3hCLENBQUMsQ0FBQyxDQUFDO0lBRUo7Ozs7T0FJRztJQUNNLFdBQVcsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxFQUFFLENBQzVDLFFBQVEsQ0FBQyxJQUFJLENBQ1gsR0FBRyxDQUFDLEdBQUcsRUFBRTtRQUNQLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxNQUFNLEVBQUUsQ0FBQztJQUNqQyxDQUFDLENBQUMsQ0FDSCxDQUNGLENBQUM7SUFFTywyQkFBMkIsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxFQUFFO1FBQzVELE9BQU8sYUFBYSxDQUFDO1lBQ25CLFFBQVE7WUFDUixJQUFJLENBQUMsZ0JBQWdCLENBQUMsYUFBYSxFQUFFO1NBQ3RDLENBQUMsQ0FBQyxJQUFJLENBQ0wsR0FBRyxDQUFDLEdBQUcsRUFBRTtZQUNQLElBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQztZQUNuQixJQUFJLENBQUMsZUFBZSxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQzlCLENBQUMsQ0FBQyxDQUNILENBQUM7SUFDSixDQUFDLENBQUMsQ0FBQztJQUVNLFdBQVcsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxFQUFFO1FBQzVDLE9BQU8sUUFBUSxDQUFDLElBQUksQ0FDbEIsR0FBRyxDQUFDLEdBQUcsRUFBRTtZQUNQLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxNQUFNLEVBQUUsQ0FBQztZQUMvQixJQUFJLENBQUMsZ0JBQWdCLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQywrQkFBK0IsQ0FBQyxDQUFDO1lBRW5FLElBQUksQ0FBQywyQkFBMkIsRUFBRSxDQUFDO1FBQ3JDLENBQUMsQ0FBQyxDQUNILENBQUM7SUFDSixDQUFDLENBQUMsQ0FBQztJQUVIO1FBQ0UsS0FBSyxDQUFDLGFBQWEsQ0FBQyxDQUFDO0lBQ3ZCLENBQUM7dUdBckVVLDRCQUE0QjsyR0FBNUIsNEJBQTRCLGNBRjNCLDRCQUE0Qjs7MkZBRTdCLDRCQUE0QjtrQkFIeEMsVUFBVTttQkFBQztvQkFDVixVQUFVLDhCQUE4QjtpQkFDekMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge092ZXJsYXksIE92ZXJsYXlSZWZ9IGZyb20gJ0Bhbmd1bGFyL2Nkay9vdmVybGF5JztcbmltcG9ydCB7Q29tcG9uZW50UG9ydGFsfSBmcm9tICdAYW5ndWxhci9jZGsvcG9ydGFsJztcbmltcG9ydCB7SW5qZWN0YWJsZSwgaW5qZWN0fSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7Q29tcG9uZW50U3RvcmV9IGZyb20gJ0BuZ3J4L2NvbXBvbmVudC1zdG9yZSc7XG5pbXBvcnQge09ic2VydmFibGUsIGNvbWJpbmVMYXRlc3QsIHRhcH0gZnJvbSAncnhqcyc7XG5pbXBvcnQge0NvbG9yUGlja2VyTW91c2V0cmFwT3ZlcmxheUNvbXBvbmVudH0gZnJvbSAnLi9jb2xvci1waWNrZXItbW91c2V0cmFwLW92ZXJsYXkuY29tcG9uZW50JztcblxuZXhwb3J0IGludGVyZmFjZSBTaW1wbGVTa2V0Y2hDb2xvclBpY2tlclN0YXRlIHtcbiAgY2xpY2tTdHJlYW06IG51bWJlcjtcbiAgaXNWaXNpYmxlOiBib29sZWFuO1xufVxuXG5jb25zdCBJTklUSUFMX1NUQVRFOiBTaW1wbGVTa2V0Y2hDb2xvclBpY2tlclN0YXRlID0ge1xuICBjbGlja1N0cmVhbTogMCxcbiAgaXNWaXNpYmxlOiBmYWxzZSxcbn07XG5cbkBJbmplY3RhYmxlKHtcbiAgcHJvdmlkZWRJbjogU2ltcGxlU2tldGNoQ29sb3JQaWNrZXJTdG9yZSxcbn0pXG5leHBvcnQgY2xhc3MgU2ltcGxlU2tldGNoQ29sb3JQaWNrZXJTdG9yZSBleHRlbmRzIENvbXBvbmVudFN0b3JlPFNpbXBsZVNrZXRjaENvbG9yUGlja2VyU3RhdGU+IHtcbiAgcHJpdmF0ZSByZWFkb25seSBvdmVybGF5U2VydmljZSA9IGluamVjdChPdmVybGF5KTtcbiAgcmVhZG9ubHkgbW91c2VUcmFwT3ZlcmxheTogT3ZlcmxheVJlZiA9IHRoaXMub3ZlcmxheVNlcnZpY2UuY3JlYXRlKHtcbiAgICBiYWNrZHJvcENsYXNzOiAnc2ltcGxlLXNrZXRjaC1tb3VzZXRyYXAtb3ZlcmxheScsXG4gICAgaGFzQmFja2Ryb3A6IHRydWUsXG4gICAgaGVpZ2h0OiAnMTAwdmgnLFxuICAgIHdpZHRoOiAnMTAwdncnLFxuICB9KTtcblxuICBwcml2YXRlIHJlYWRvbmx5IG1vdXNldHJhcE92ZXJsYXlDb21wb25lbnRQb3J0YWw6IENvbXBvbmVudFBvcnRhbDxDb2xvclBpY2tlck1vdXNldHJhcE92ZXJsYXlDb21wb25lbnQ+ID1cbiAgICBuZXcgQ29tcG9uZW50UG9ydGFsKENvbG9yUGlja2VyTW91c2V0cmFwT3ZlcmxheUNvbXBvbmVudCk7XG5cbiAgLyoqXG4gICAqICstLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tK1xuICAgKiBTRUxFQ1RPUlNcbiAgICogKy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0rXG4gICAqL1xuICByZWFkb25seSBpc1Zpc2libGUkOiBPYnNlcnZhYmxlPGJvb2xlYW4+ID0gdGhpcy5zZWxlY3QoXG4gICAgc3RhdGUgPT4gc3RhdGUuaXNWaXNpYmxlXG4gICk7XG5cbiAgLyoqXG4gICAqICstLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tK1xuICAgKiBVUERBVEVSU1xuICAgKiArLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLStcbiAgICovXG4gIHJlYWRvbmx5IHVwZGF0ZUlzVmlzaWJsZSA9IHRoaXMudXBkYXRlcigoc3RhdGUsIG5ld0lzVmlzaWJsZTogYm9vbGVhbikgPT4gKHtcbiAgICAuLi5zdGF0ZSxcbiAgICBpc1Zpc2libGU6IG5ld0lzVmlzaWJsZSxcbiAgfSkpO1xuXG4gIC8qKlxuICAgKiArLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLStcbiAgICogRUZGRUNUU1xuICAgKiArLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLStcbiAgICovXG4gIHJlYWRvbmx5IGhpZGVPdmVybGF5ID0gdGhpcy5lZmZlY3QodHJpZ2dlciQgPT5cbiAgICB0cmlnZ2VyJC5waXBlKFxuICAgICAgdGFwKCgpID0+IHtcbiAgICAgICAgdGhpcy5tb3VzZVRyYXBPdmVybGF5LmRldGFjaCgpO1xuICAgICAgfSlcbiAgICApXG4gICk7XG5cbiAgcmVhZG9ubHkgbW91c2VUcmFwT3ZlcmxheUNsaWNrU3RyZWFtID0gdGhpcy5lZmZlY3QodHJpZ2dlciQgPT4ge1xuICAgIHJldHVybiBjb21iaW5lTGF0ZXN0KFtcbiAgICAgIHRyaWdnZXIkLFxuICAgICAgdGhpcy5tb3VzZVRyYXBPdmVybGF5LmJhY2tkcm9wQ2xpY2soKSxcbiAgICBdKS5waXBlKFxuICAgICAgdGFwKCgpID0+IHtcbiAgICAgICAgdGhpcy5oaWRlT3ZlcmxheSgpO1xuICAgICAgICB0aGlzLnVwZGF0ZUlzVmlzaWJsZShmYWxzZSk7XG4gICAgICB9KVxuICAgICk7XG4gIH0pO1xuXG4gIHJlYWRvbmx5IHNob3dPdmVybGF5ID0gdGhpcy5lZmZlY3QodHJpZ2dlciQgPT4ge1xuICAgIHJldHVybiB0cmlnZ2VyJC5waXBlKFxuICAgICAgdGFwKCgpID0+IHtcbiAgICAgICAgdGhpcy5tb3VzZVRyYXBPdmVybGF5LmRldGFjaCgpO1xuICAgICAgICB0aGlzLm1vdXNlVHJhcE92ZXJsYXkuYXR0YWNoKHRoaXMubW91c2V0cmFwT3ZlcmxheUNvbXBvbmVudFBvcnRhbCk7XG5cbiAgICAgICAgdGhpcy5tb3VzZVRyYXBPdmVybGF5Q2xpY2tTdHJlYW0oKTtcbiAgICAgIH0pXG4gICAgKTtcbiAgfSk7XG5cbiAgY29uc3RydWN0b3IoKSB7XG4gICAgc3VwZXIoSU5JVElBTF9TVEFURSk7XG4gIH1cbn1cbiJdfQ==