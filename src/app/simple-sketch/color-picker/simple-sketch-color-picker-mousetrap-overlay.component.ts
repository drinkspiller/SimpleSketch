import {Component, inject} from '@angular/core';

@Component({
  selector: 'simple-sketch-color-picker-mousetrap-overlay',
  standalone: true,
  imports: [],
  providers: [],
  template: '',

  styles: [
    `
      .simple-sketch-overlay {
        background-color: rgba(0, 255, 0, 0.7);
        display: block;
        height: 100vh;
        pointer-events: all;
        width: 100vw;
      }
    `,
  ],
})
export class ColorPickerMousetrapOverlayComponent {}
