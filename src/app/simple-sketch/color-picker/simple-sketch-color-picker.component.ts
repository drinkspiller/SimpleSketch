import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  HostListener,
  Input,
  Output,
  inject,
} from '@angular/core';
import {SimpleSketchColorPickerStore} from './simple-sketch-color-picker.store';
import {ColorPickerControl, ColorPickerModule} from '@iplab/ngx-color-picker';
import {take, takeUntil} from 'rxjs';
import {CommonModule} from '@angular/common';

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
  templateUrl: './simple-sketch-color-picker.component.html',
  styleUrl: './simple-sketch-color-picker.component.scss',
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

  @HostListener('click', ['$event'])
  toggleColorPicker(event: Event) {
    event.stopPropagation();

    this.isVisible$.pipe(take(1)).subscribe(isVisible => {
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
    this.simpleSketchColorPickerStore.updateIsVisible(false);
  }

  discardClick(event: MouseEvent | TouchEvent): void {
    event.stopPropagation();
    this.simpleSketchColorPickerStore.updateIsVisible(false);
  }
}
