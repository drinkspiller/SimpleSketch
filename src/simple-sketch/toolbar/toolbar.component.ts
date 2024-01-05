import {CommonModule} from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {MatToolbarModule} from '@angular/material/toolbar';

import {SimpleSketchColorPickerComponent} from '../color-picker/color-picker.component';
import {Observable} from 'rxjs';

export enum Mode {
  ERASE = 'erase',
  SKETCH = 'sketch',
}

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
  @Output()
  clearCanvas: EventEmitter<void> = new EventEmitter();

  @Output()
  backgroundColorChange: EventEmitter<string> = new EventEmitter();

  @Output()
  paintColorChange: EventEmitter<string> = new EventEmitter();

  @Output()
  modeChange: EventEmitter<Mode> = new EventEmitter();

  protected backgroundColor$: Observable<string> | null = null;
  @Input({required: true})
  set backgroundColor(backgroundColor: Observable<string>) {
    this.backgroundColor$ = backgroundColor;
  }

  protected paintColor$: Observable<string> | null = null;
  @Input({required: true})
  set paintColor(paintColor: Observable<string>) {
    this.paintColor$ = paintColor;
  }

  protected mode$: Observable<Mode> | null = null;
  @Input({required: true})
  set mode(mode: Observable<Mode>) {
    this.mode$ = mode;
  }

  protected readonly Mode = Mode;

  changeBackgroundColor(newColor: string) {
    this.backgroundColorChange.emit(newColor);
  }

  changePaintColor(newColor: string) {
    this.paintColorChange.emit(newColor);
  }

  changeMode(newMode: Mode) {
    this.modeChange.emit(newMode);
  }

  emitClearCanvas() {
    this.clearCanvas.emit();
  }
}
