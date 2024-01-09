import { EventEmitter } from '@angular/core';
import { ColorPickerControl } from '@iplab/ngx-color-picker';
import { SimpleSketchColorPickerStore } from './color-picker.component.store';
import * as i0 from "@angular/core";
export declare const DEFAULT_SWATCHES: string[];
export declare class SimpleSketchColorPickerComponent {
    set color(color: string);
    get color(): string;
    colorChange: EventEmitter<string>;
    pickerVisibleChange: EventEmitter<boolean>;
    toggleColorPicker(): void;
    protected readonly colorControl: ColorPickerControl;
    protected simpleSketchColorPickerStore: SimpleSketchColorPickerStore;
    protected isVisible$: import("rxjs").Observable<boolean>;
    changeColor(): void;
    close(): void;
    discardClick(event: MouseEvent | TouchEvent): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<SimpleSketchColorPickerComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<SimpleSketchColorPickerComponent, "simple-sketch-color-picker", never, { "color": { "alias": "color"; "required": false; }; }, { "colorChange": "colorChange"; "pickerVisibleChange": "pickerVisibleChange"; }, never, never, true, never>;
}
