import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Output,
  inject,
} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {SimpleSketchStore} from './simple-sketch.store';
import {CommonModule} from '@angular/common';

@Component({
  selector: 'simple-sketch-toolbar',
  standalone: true,
  imports: [CommonModule, FormsModule, MatInputModule],
  templateUrl: './simple-sketch-toolbar.component.html',
  styleUrl: './simple-sketch-toolbar.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SimpleSketchToolbarComponent {
  @Output() backgroundColorChange = new EventEmitter<string>();
  @Output() paintColorChange = new EventEmitter<string>();

  private readonly simpleSketchStore: SimpleSketchStore =
    inject(SimpleSketchStore);
  protected readonly backgroundColor$ = this.simpleSketchStore.backgroundColor$;
  protected readonly paintColor$ = this.simpleSketchStore.paintColor$;

  changeBackgroundColor(event: Event) {
    const newColor = (event.target as HTMLInputElement).value;
    this.backgroundColorChange.emit(newColor);
    this.simpleSketchStore.updateBackGroundColor(newColor);
  }

  changePaintColor(event: Event) {
    const newColor = (event.target as HTMLInputElement).value;
    this.paintColorChange.emit(newColor);
    this.simpleSketchStore.updatePaintColor(newColor);
  }
}
