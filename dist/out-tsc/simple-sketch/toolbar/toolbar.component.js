import { __decorate } from "tslib";
import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output, } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatToolbarModule } from '@angular/material/toolbar';
import { SimpleSketchColorPickerComponent } from '../color-picker/color-picker.component';
export var Mode;
(function (Mode) {
    Mode["ERASE"] = "erase";
    Mode["SKETCH"] = "sketch";
})(Mode || (Mode = {}));
let SimpleSketchToolbarComponent = class SimpleSketchToolbarComponent {
    constructor() {
        this.clearCanvas = new EventEmitter();
        this.backgroundColorChange = new EventEmitter();
        this.paintColorChange = new EventEmitter();
        this.modeChange = new EventEmitter();
        this.backgroundColor$ = null;
        this.paintColor$ = null;
        this.mode$ = null;
        this.Mode = Mode;
    }
    set backgroundColor(backgroundColor) {
        this.backgroundColor$ = backgroundColor;
    }
    set paintColor(paintColor) {
        this.paintColor$ = paintColor;
    }
    set mode(mode) {
        this.mode$ = mode;
    }
    changeBackgroundColor(newColor) {
        this.backgroundColorChange.emit(newColor);
    }
    changePaintColor(newColor) {
        this.paintColorChange.emit(newColor);
    }
    changeMode(newMode) {
        this.modeChange.emit(newMode);
    }
    emitClearCanvas() {
        this.clearCanvas.emit();
    }
};
__decorate([
    Output()
], SimpleSketchToolbarComponent.prototype, "clearCanvas", void 0);
__decorate([
    Output()
], SimpleSketchToolbarComponent.prototype, "backgroundColorChange", void 0);
__decorate([
    Output()
], SimpleSketchToolbarComponent.prototype, "paintColorChange", void 0);
__decorate([
    Output()
], SimpleSketchToolbarComponent.prototype, "modeChange", void 0);
__decorate([
    Input({ required: true })
], SimpleSketchToolbarComponent.prototype, "backgroundColor", null);
__decorate([
    Input({ required: true })
], SimpleSketchToolbarComponent.prototype, "paintColor", null);
__decorate([
    Input({ required: true })
], SimpleSketchToolbarComponent.prototype, "mode", null);
SimpleSketchToolbarComponent = __decorate([
    Component({
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
], SimpleSketchToolbarComponent);
export { SimpleSketchToolbarComponent };
//# sourceMappingURL=toolbar.component.js.map