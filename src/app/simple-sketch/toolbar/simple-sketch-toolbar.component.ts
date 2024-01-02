import {ChangeDetectionStrategy, Component, inject} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {MatToolbarModule} from '@angular/material/toolbar';
import {SimpleSketchCanvasStore} from '../canvas/simple-sketch-canvas.store';
import {SimpleSketchColorPickerComponent} from '../color-picker/simple-sketch-color-picker.component';

@Component({
  selector: 'simple-sketch-toolbar',
  standalone: true,
  imports: [
    FormsModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatIconModule,
    MatInputModule,
    MatToolbarModule,
    SimpleSketchColorPickerComponent,
  ],
  templateUrl: './simple-sketch-toolbar.component.html',
  styleUrl: './simple-sketch-toolbar.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SimpleSketchToolbarComponent {
  private readonly simpleSketchCanvasStore: SimpleSketchCanvasStore = inject(
    SimpleSketchCanvasStore
  );
  protected readonly backgroundColor$ =
    this.simpleSketchCanvasStore.backgroundColor$;
  protected readonly paintColor$ = this.simpleSketchCanvasStore.paintColor$;

  changeBackgroundColor(newColor: string) {
    this.simpleSketchCanvasStore.updateBackGroundColor(newColor);
  }

  changePaintColor(newColor: string) {
    this.simpleSketchCanvasStore.updatePaintColor(newColor);
  }
}
