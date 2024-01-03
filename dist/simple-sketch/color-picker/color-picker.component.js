import { __decorate } from "tslib";
import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, HostListener, Input, Output, inject, } from '@angular/core';
import { ColorPickerControl, ColorPickerModule } from '@iplab/ngx-color-picker';
import { take } from 'rxjs';
import { SimpleSketchColorPickerStore } from './color-picker.store';
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
let SimpleSketchColorPickerComponent = class SimpleSketchColorPickerComponent {
    constructor() {
        this.colorChange = new EventEmitter();
        this.pickerVisibleChange = new EventEmitter();
        this.colorControl = new ColorPickerControl()
            .setValueFrom('#ffffff')
            .setColorPresets(DEFAULT_SWATCHES);
        this.simpleSketchColorPickerStore = inject(SimpleSketchColorPickerStore);
        this.isVisible$ = this.simpleSketchColorPickerStore.isVisible$;
    }
    set color(color) {
        this.colorControl.setValueFrom(color);
    }
    get color() {
        return this.colorControl.value.toHexString();
    }
    toggleColorPicker(event) {
        this.isVisible$.pipe(take(1)).subscribe(isVisible => {
            if (!isVisible) {
                this.simpleSketchColorPickerStore.showOverlay();
            }
            else {
                this.simpleSketchColorPickerStore.hideOverlay();
            }
            this.simpleSketchColorPickerStore.updateIsVisible(!isVisible);
        });
    }
    changeColor() {
        this.colorChange.emit(this.color);
        this.close();
    }
    close() {
        this.simpleSketchColorPickerStore.hideOverlay();
        this.simpleSketchColorPickerStore.updateIsVisible(false);
    }
    discardClick(event) {
        event.stopPropagation();
        this.close();
    }
};
__decorate([
    Input()
], SimpleSketchColorPickerComponent.prototype, "color", null);
__decorate([
    Output()
], SimpleSketchColorPickerComponent.prototype, "colorChange", void 0);
__decorate([
    Output()
], SimpleSketchColorPickerComponent.prototype, "pickerVisibleChange", void 0);
__decorate([
    HostListener('click', ['$event'])
], SimpleSketchColorPickerComponent.prototype, "toggleColorPicker", null);
SimpleSketchColorPickerComponent = __decorate([
    Component({
        selector: 'simple-sketch-color-picker',
        standalone: true,
        imports: [CommonModule, ColorPickerModule],
        providers: [SimpleSketchColorPickerStore],
        templateUrl: './color-picker.component.html',
        styleUrl: './color-picker.component.scss',
        changeDetection: ChangeDetectionStrategy.OnPush,
    })
], SimpleSketchColorPickerComponent);
export { SimpleSketchColorPickerComponent };
//# sourceMappingURL=color-picker.component.js.map