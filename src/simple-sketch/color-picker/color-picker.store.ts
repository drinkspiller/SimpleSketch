import {Overlay, OverlayRef} from '@angular/cdk/overlay';
import {ComponentPortal} from '@angular/cdk/portal';
import {Injectable, inject} from '@angular/core';
import {ComponentStore} from '@ngrx/component-store';
import {Observable, combineLatest, tap} from 'rxjs';
import {ColorPickerMousetrapOverlayComponent} from './color-picker-mousetrap-overlay.component';

export interface SimpleSketchColorPickerState {
  clickStream: number;
  isVisible: boolean;
}

const INITIAL_STATE: SimpleSketchColorPickerState = {
  clickStream: 0,
  isVisible: false,
};

@Injectable({
  providedIn: SimpleSketchColorPickerStore,
})
export class SimpleSketchColorPickerStore extends ComponentStore<SimpleSketchColorPickerState> {
  private readonly overlayService = inject(Overlay);
  readonly mouseTrapOverlay: OverlayRef = this.overlayService.create({
    backdropClass: 'simple-sketch-mousetrap-overlay',
    hasBackdrop: true,
    height: '100vh',
    width: '100vw',
  });

  private readonly mousetrapOverlayComponentPortal: ComponentPortal<ColorPickerMousetrapOverlayComponent> =
    new ComponentPortal(ColorPickerMousetrapOverlayComponent);

  /**
   * +-------------------------------------------+
   * SELECTORS
   * +-------------------------------------------+
   */
  readonly isVisible$: Observable<boolean> = this.select(
    state => state.isVisible
  );

  /**
   * +-------------------------------------------+
   * UPDATERS
   * +-------------------------------------------+
   */
  readonly updateIsVisible = this.updater((state, newIsVisible: boolean) => ({
    ...state,
    isVisible: newIsVisible,
  }));

  /**
   * +-------------------------------------------+
   * EFFECTS
   * +-------------------------------------------+
   */
  readonly hideOverlay = this.effect(trigger$ =>
    trigger$.pipe(
      tap(() => {
        this.mouseTrapOverlay.detach();
      })
    )
  );

  readonly mouseTrapOverlayClickStream = this.effect(trigger$ => {
    return combineLatest([
      trigger$,
      this.mouseTrapOverlay.backdropClick(),
    ]).pipe(
      tap(() => {
        this.hideOverlay();
        this.updateIsVisible(false);
      })
    );
  });

  readonly showOverlay = this.effect(trigger$ => {
    return trigger$.pipe(
      tap(() => {
        this.mouseTrapOverlay.detach();
        this.mouseTrapOverlay.attach(this.mousetrapOverlayComponentPortal);

        this.mouseTrapOverlayClickStream();
      })
    );
  });

  constructor() {
    super(INITIAL_STATE);
  }
}
