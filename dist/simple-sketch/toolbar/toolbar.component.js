import { __decorate } from "tslib";
import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatToolbarModule } from '@angular/material/toolbar';
import { Mode, SimpleSketchCanvasStore } from '../canvas/canvas.store';
import { SimpleSketchColorPickerComponent } from '../color-picker/color-picker.component';
let SimpleSketchToolbarComponent = class SimpleSketchToolbarComponent {
    constructor() {
        this.simpleSketchCanvasStore = inject(SimpleSketchCanvasStore);
        this.backgroundColor$ = this.simpleSketchCanvasStore.backgroundColor$;
        this.paintColor$ = this.simpleSketchCanvasStore.paintColor$;
        this.mode$ = this.simpleSketchCanvasStore.mode$;
        this.Mode = Mode;
    }
    changeBackgroundColor(newColor) {
        this.simpleSketchCanvasStore.updateBackGroundColor(newColor);
    }
    changeMode(newMode) {
        this.simpleSketchCanvasStore.updateMode(newMode);
    }
    changePaintColor(newColor) {
        this.simpleSketchCanvasStore.updatePaintColor(newColor);
    }
    clearCanvas() {
        this.simpleSketchCanvasStore.clearCanvas();
    }
};
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