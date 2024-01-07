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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29sb3ItcGlja2VyLnN0b3JlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL3NpbXBsZS1za2V0Y2gvY29sb3ItcGlja2VyL2NvbG9yLXBpY2tlci5zdG9yZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUMsT0FBTyxFQUFhLE1BQU0sc0JBQXNCLENBQUM7QUFDekQsT0FBTyxFQUFDLGVBQWUsRUFBQyxNQUFNLHFCQUFxQixDQUFDO0FBQ3BELE9BQU8sRUFBQyxVQUFVLEVBQUUsTUFBTSxFQUFDLE1BQU0sZUFBZSxDQUFDO0FBQ2pELE9BQU8sRUFBQyxjQUFjLEVBQUMsTUFBTSx1QkFBdUIsQ0FBQztBQUNyRCxPQUFPLEVBQWEsYUFBYSxFQUFFLEdBQUcsRUFBQyxNQUFNLE1BQU0sQ0FBQztBQUNwRCxPQUFPLEVBQUMsb0NBQW9DLEVBQUMsTUFBTSw0Q0FBNEMsQ0FBQzs7QUFNaEcsTUFBTSxhQUFhLEdBQWlDO0lBQ2xELFNBQVMsRUFBRSxLQUFLO0NBQ2pCLENBQUM7QUFLRixNQUFNLE9BQU8sNEJBQTZCLFNBQVEsY0FBNEM7SUFDM0UsY0FBYyxHQUFHLE1BQU0sQ0FBQyxPQUFPLENBQUMsQ0FBQztJQUN6QyxnQkFBZ0IsR0FBZSxJQUFJLENBQUMsY0FBYyxDQUFDLE1BQU0sQ0FBQztRQUNqRSxhQUFhLEVBQUUsaUNBQWlDO1FBQ2hELFdBQVcsRUFBRSxJQUFJO1FBQ2pCLE1BQU0sRUFBRSxPQUFPO1FBQ2YsS0FBSyxFQUFFLE9BQU87S0FDZixDQUFDLENBQUM7SUFFYywrQkFBK0IsR0FDOUMsSUFBSSxlQUFlLENBQUMsb0NBQW9DLENBQUMsQ0FBQztJQUU1RDs7OztPQUlHO0lBQ00sVUFBVSxHQUF3QixJQUFJLENBQUMsTUFBTSxDQUNwRCxLQUFLLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQyxTQUFTLENBQ3pCLENBQUM7SUFFRjs7OztPQUlHO0lBQ00sZUFBZSxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxLQUFLLEVBQUUsWUFBcUIsRUFBRSxFQUFFLENBQUMsQ0FBQztRQUN6RSxHQUFHLEtBQUs7UUFDUixTQUFTLEVBQUUsWUFBWTtLQUN4QixDQUFDLENBQUMsQ0FBQztJQUVKOzs7O09BSUc7SUFDTSxXQUFXLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsRUFBRSxDQUM1QyxRQUFRLENBQUMsSUFBSSxDQUNYLEdBQUcsQ0FBQyxHQUFHLEVBQUU7UUFDUCxJQUFJLENBQUMsZ0JBQWdCLENBQUMsTUFBTSxFQUFFLENBQUM7SUFDakMsQ0FBQyxDQUFDLENBQ0gsQ0FDRixDQUFDO0lBRU8sMkJBQTJCLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsRUFBRTtRQUM1RCxPQUFPLGFBQWEsQ0FBQztZQUNuQixRQUFRO1lBQ1IsSUFBSSxDQUFDLGdCQUFnQixDQUFDLGFBQWEsRUFBRTtTQUN0QyxDQUFDLENBQUMsSUFBSSxDQUNMLEdBQUcsQ0FBQyxHQUFHLEVBQUU7WUFDUCxJQUFJLENBQUMsV0FBVyxFQUFFLENBQUM7WUFDbkIsSUFBSSxDQUFDLGVBQWUsQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUM5QixDQUFDLENBQUMsQ0FDSCxDQUFDO0lBQ0osQ0FBQyxDQUFDLENBQUM7SUFFTSxXQUFXLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsRUFBRTtRQUM1QyxPQUFPLFFBQVEsQ0FBQyxJQUFJLENBQ2xCLEdBQUcsQ0FBQyxHQUFHLEVBQUU7WUFDUCxJQUFJLENBQUMsZ0JBQWdCLENBQUMsTUFBTSxFQUFFLENBQUM7WUFDL0IsSUFBSSxDQUFDLGdCQUFnQixDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsK0JBQStCLENBQUMsQ0FBQztZQUVuRSxJQUFJLENBQUMsMkJBQTJCLEVBQUUsQ0FBQztRQUNyQyxDQUFDLENBQUMsQ0FDSCxDQUFDO0lBQ0osQ0FBQyxDQUFDLENBQUM7SUFFSDtRQUNFLEtBQUssQ0FBQyxhQUFhLENBQUMsQ0FBQztJQUN2QixDQUFDO3VHQXJFVSw0QkFBNEI7MkdBQTVCLDRCQUE0QixjQUYzQiw0QkFBNEI7OzJGQUU3Qiw0QkFBNEI7a0JBSHhDLFVBQVU7bUJBQUM7b0JBQ1YsVUFBVSw4QkFBOEI7aUJBQ3pDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtPdmVybGF5LCBPdmVybGF5UmVmfSBmcm9tICdAYW5ndWxhci9jZGsvb3ZlcmxheSc7XG5pbXBvcnQge0NvbXBvbmVudFBvcnRhbH0gZnJvbSAnQGFuZ3VsYXIvY2RrL3BvcnRhbCc7XG5pbXBvcnQge0luamVjdGFibGUsIGluamVjdH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge0NvbXBvbmVudFN0b3JlfSBmcm9tICdAbmdyeC9jb21wb25lbnQtc3RvcmUnO1xuaW1wb3J0IHtPYnNlcnZhYmxlLCBjb21iaW5lTGF0ZXN0LCB0YXB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHtDb2xvclBpY2tlck1vdXNldHJhcE92ZXJsYXlDb21wb25lbnR9IGZyb20gJy4vY29sb3ItcGlja2VyLW1vdXNldHJhcC1vdmVybGF5LmNvbXBvbmVudCc7XG5cbmV4cG9ydCBpbnRlcmZhY2UgU2ltcGxlU2tldGNoQ29sb3JQaWNrZXJTdGF0ZSB7XG4gIGlzVmlzaWJsZTogYm9vbGVhbjtcbn1cblxuY29uc3QgSU5JVElBTF9TVEFURTogU2ltcGxlU2tldGNoQ29sb3JQaWNrZXJTdGF0ZSA9IHtcbiAgaXNWaXNpYmxlOiBmYWxzZSxcbn07XG5cbkBJbmplY3RhYmxlKHtcbiAgcHJvdmlkZWRJbjogU2ltcGxlU2tldGNoQ29sb3JQaWNrZXJTdG9yZSxcbn0pXG5leHBvcnQgY2xhc3MgU2ltcGxlU2tldGNoQ29sb3JQaWNrZXJTdG9yZSBleHRlbmRzIENvbXBvbmVudFN0b3JlPFNpbXBsZVNrZXRjaENvbG9yUGlja2VyU3RhdGU+IHtcbiAgcHJpdmF0ZSByZWFkb25seSBvdmVybGF5U2VydmljZSA9IGluamVjdChPdmVybGF5KTtcbiAgcmVhZG9ubHkgbW91c2VUcmFwT3ZlcmxheTogT3ZlcmxheVJlZiA9IHRoaXMub3ZlcmxheVNlcnZpY2UuY3JlYXRlKHtcbiAgICBiYWNrZHJvcENsYXNzOiAnc2ltcGxlLXNrZXRjaC1tb3VzZXRyYXAtb3ZlcmxheScsXG4gICAgaGFzQmFja2Ryb3A6IHRydWUsXG4gICAgaGVpZ2h0OiAnMTAwdmgnLFxuICAgIHdpZHRoOiAnMTAwdncnLFxuICB9KTtcblxuICBwcml2YXRlIHJlYWRvbmx5IG1vdXNldHJhcE92ZXJsYXlDb21wb25lbnRQb3J0YWw6IENvbXBvbmVudFBvcnRhbDxDb2xvclBpY2tlck1vdXNldHJhcE92ZXJsYXlDb21wb25lbnQ+ID1cbiAgICBuZXcgQ29tcG9uZW50UG9ydGFsKENvbG9yUGlja2VyTW91c2V0cmFwT3ZlcmxheUNvbXBvbmVudCk7XG5cbiAgLyoqXG4gICAqICstLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tK1xuICAgKiBTRUxFQ1RPUlNcbiAgICogKy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0rXG4gICAqL1xuICByZWFkb25seSBpc1Zpc2libGUkOiBPYnNlcnZhYmxlPGJvb2xlYW4+ID0gdGhpcy5zZWxlY3QoXG4gICAgc3RhdGUgPT4gc3RhdGUuaXNWaXNpYmxlXG4gICk7XG5cbiAgLyoqXG4gICAqICstLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tK1xuICAgKiBVUERBVEVSU1xuICAgKiArLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLStcbiAgICovXG4gIHJlYWRvbmx5IHVwZGF0ZUlzVmlzaWJsZSA9IHRoaXMudXBkYXRlcigoc3RhdGUsIG5ld0lzVmlzaWJsZTogYm9vbGVhbikgPT4gKHtcbiAgICAuLi5zdGF0ZSxcbiAgICBpc1Zpc2libGU6IG5ld0lzVmlzaWJsZSxcbiAgfSkpO1xuXG4gIC8qKlxuICAgKiArLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLStcbiAgICogRUZGRUNUU1xuICAgKiArLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLStcbiAgICovXG4gIHJlYWRvbmx5IGhpZGVPdmVybGF5ID0gdGhpcy5lZmZlY3QodHJpZ2dlciQgPT5cbiAgICB0cmlnZ2VyJC5waXBlKFxuICAgICAgdGFwKCgpID0+IHtcbiAgICAgICAgdGhpcy5tb3VzZVRyYXBPdmVybGF5LmRldGFjaCgpO1xuICAgICAgfSlcbiAgICApXG4gICk7XG5cbiAgcmVhZG9ubHkgbW91c2VUcmFwT3ZlcmxheUNsaWNrU3RyZWFtID0gdGhpcy5lZmZlY3QodHJpZ2dlciQgPT4ge1xuICAgIHJldHVybiBjb21iaW5lTGF0ZXN0KFtcbiAgICAgIHRyaWdnZXIkLFxuICAgICAgdGhpcy5tb3VzZVRyYXBPdmVybGF5LmJhY2tkcm9wQ2xpY2soKSxcbiAgICBdKS5waXBlKFxuICAgICAgdGFwKCgpID0+IHtcbiAgICAgICAgdGhpcy5oaWRlT3ZlcmxheSgpO1xuICAgICAgICB0aGlzLnVwZGF0ZUlzVmlzaWJsZShmYWxzZSk7XG4gICAgICB9KVxuICAgICk7XG4gIH0pO1xuXG4gIHJlYWRvbmx5IHNob3dPdmVybGF5ID0gdGhpcy5lZmZlY3QodHJpZ2dlciQgPT4ge1xuICAgIHJldHVybiB0cmlnZ2VyJC5waXBlKFxuICAgICAgdGFwKCgpID0+IHtcbiAgICAgICAgdGhpcy5tb3VzZVRyYXBPdmVybGF5LmRldGFjaCgpO1xuICAgICAgICB0aGlzLm1vdXNlVHJhcE92ZXJsYXkuYXR0YWNoKHRoaXMubW91c2V0cmFwT3ZlcmxheUNvbXBvbmVudFBvcnRhbCk7XG5cbiAgICAgICAgdGhpcy5tb3VzZVRyYXBPdmVybGF5Q2xpY2tTdHJlYW0oKTtcbiAgICAgIH0pXG4gICAgKTtcbiAgfSk7XG5cbiAgY29uc3RydWN0b3IoKSB7XG4gICAgc3VwZXIoSU5JVElBTF9TVEFURSk7XG4gIH1cbn1cbiJdfQ==