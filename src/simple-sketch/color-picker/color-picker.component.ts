import {CommonModule} from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  HostListener,
  Input,
  Output,
  inject,
} from '@angular/core';
import {ColorPickerControl, ColorPickerModule} from '@iplab/ngx-color-picker';
import {take} from 'rxjs';
import {SimpleSketchColorPickerStore} from './color-picker.store';

export const DEFAULT_SWATCHES = [
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
  selector: 'simple-sketch-color-picker',
  standalone: true,
  imports: [CommonModule, ColorPickerModule],
  providers: [SimpleSketchColorPickerStore],
  templateUrl: './color-picker.component.html',
  styleUrl: './color-picker.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SimpleSketchColorPickerComponent {
  @Input()
  set color(color: string) {
    this.colorControl.setValueFrom(color);
  }
  get color() {
    return this.colorControl.value.toHexString();
  }

  @Output()
  public colorChange: EventEmitter<string> = new EventEmitter();

  @Output()
  public pickerVisibleChange: EventEmitter<boolean> = new EventEmitter();

  @HostListener('click', ['$event'])
  toggleColorPicker() {
    this.isVisible$.pipe(take(1)).subscribe(isVisible => {
      if (!isVisible) {
        this.simpleSketchColorPickerStore.showOverlay();
      } else {
        this.simpleSketchColorPickerStore.hideOverlay();
      }
      this.simpleSketchColorPickerStore.updateIsVisible(!isVisible);
    });
  }

  protected readonly colorControl = new ColorPickerControl()
    .setValueFrom('#ffffff')
    .setColorPresets(DEFAULT_SWATCHES);

  protected simpleSketchColorPickerStore = inject(SimpleSketchColorPickerStore);
  protected isVisible$ = this.simpleSketchColorPickerStore.isVisible$;

  changeColor(): void {
    this.colorChange.emit(this.color);
    this.close();
  }

  close() {
    this.simpleSketchColorPickerStore.hideOverlay();
    this.simpleSketchColorPickerStore.updateIsVisible(false);
  }

  discardClick(event: MouseEvent | TouchEvent): void {
    event.stopPropagation();
    this.close();
  }
}
