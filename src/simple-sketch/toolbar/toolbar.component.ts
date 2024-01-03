import {CommonModule} from '@angular/common';
import {ChangeDetectionStrategy, Component, inject} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {MatToolbarModule} from '@angular/material/toolbar';
import {Mode, SimpleSketchCanvasStore} from '../canvas/canvas.store';
import {SimpleSketchColorPickerComponent} from '../color-picker/color-picker.component';

@Component({
  selector: 'simple-sketch-toolbar',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatIconModule,
    MatInputModule,
    MatToolbarModule,
    SimpleSketchColorPickerComponent,
  ],
  templateUrl: './toolbar.component.html',
  styleUrl: './toolbar.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SimpleSketchToolbarComponent {
  private readonly simpleSketchCanvasStore: SimpleSketchCanvasStore = inject(
    SimpleSketchCanvasStore
  );
  protected readonly backgroundColor$ =
    this.simpleSketchCanvasStore.backgroundColor$;
  protected readonly paintColor$ = this.simpleSketchCanvasStore.paintColor$;
  protected readonly mode$ = this.simpleSketchCanvasStore.mode$;
  readonly Mode = Mode;

  changeBackgroundColor(newColor: string) {
    this.simpleSketchCanvasStore.updateBackGroundColor(newColor);
  }

  changeMode(newMode: Mode) {
    this.simpleSketchCanvasStore.updateMode(newMode);
  }

  changePaintColor(newColor: string) {
    this.simpleSketchCanvasStore.updatePaintColor(newColor);
  }

  clearCanvas() {
    this.simpleSketchCanvasStore.clearCanvas();
  }
}
