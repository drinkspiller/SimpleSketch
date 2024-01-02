import {CommonModule} from '@angular/common';
import {ChangeDetectionStrategy, Component, inject} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {MatToolbarModule} from '@angular/material/toolbar';
import {SimpleSketchStore} from '../store/simple-sketch.store';
import {ColorPickerControl, ColorPickerModule} from '@iplab/ngx-color-picker';

const DEFAULT_SWATCHES = [
  '#b80000',
  '#db3e00',
  '#fccb00',
  '#008b02',
  '#004dcf',
  '#bdbdbd',
  '#ffffff',
  '#000000',
];

@Component({
  selector: 'simple-sketch-toolbar',
  standalone: true,
  imports: [
    CommonModule,
    ColorPickerModule,
    FormsModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatIconModule,
    MatInputModule,
    MatToolbarModule,
  ],
  templateUrl: './simple-sketch-toolbar.component.html',
  styleUrl: './simple-sketch-toolbar.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SimpleSketchToolbarComponent {
  private readonly simpleSketchStore: SimpleSketchStore =
    inject(SimpleSketchStore);
  protected readonly backgroundColor$ = this.simpleSketchStore.backgroundColor$;
  protected readonly paintColor$ = this.simpleSketchStore.paintColor$;
  protected readonly backgroundColor = new ColorPickerControl()
    .setValueFrom('#ffffff')
    .setColorPresets(DEFAULT_SWATCHES);
  protected readonly paintColor = new ColorPickerControl()
    .setValueFrom('#000000')
    .setColorPresets(DEFAULT_SWATCHES);

  changeBackgroundColor(newColor: string) {
    this.simpleSketchStore.updateBackGroundColor(newColor);
  }

  changePaintColor(newColor: string) {
    this.simpleSketchStore.updatePaintColor(newColor);
  }
}
