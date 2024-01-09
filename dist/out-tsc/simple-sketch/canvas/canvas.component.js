import { __decorate } from "tslib";
import { ChangeDetectionStrategy, Component, inject, Input, ViewChild, } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { shareReplay } from 'rxjs/operators';
import { SimpleSketchToolbarComponent } from '../toolbar/toolbar.component';
import { SimpleSketchCanvasStore } from './canvas.component.store';
let SimpleSketchCanvasComponent = class SimpleSketchCanvasComponent {
    constructor() {
        this.showToolbar = true;
        this.backgroundColor = '#ffffff';
        this.paintColor = '#000000';
        this.canvas = null;
        this.simpleSketchCanvasStore = inject(SimpleSketchCanvasStore);
        this.backgroundColor$ = this.simpleSketchCanvasStore.backgroundColor$.pipe(shareReplay({ bufferSize: 1, refCount: true }));
        this.mode$ = this.simpleSketchCanvasStore.mode$.pipe(shareReplay({ bufferSize: 1, refCount: true }));
        this.paintColor$ = this.simpleSketchCanvasStore.paintColor$.pipe(shareReplay({ bufferSize: 1, refCount: true }));
    }
    ngAfterViewInit() {
        if (this.canvas === null)
            return;
        this.simpleSketchCanvasStore.init([
            this.canvas.nativeElement,
            this.backgroundColor,
            this.paintColor,
        ]);
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
    sketch(event) {
        this.simpleSketchCanvasStore.sketch(event);
    }
    startSketch(event) {
        this.simpleSketchCanvasStore.startSketch(event);
    }
    stopSketch(event) {
        this.simpleSketchCanvasStore.stopSketch(event);
    }
};
__decorate([
    Input({ required: false })
], SimpleSketchCanvasComponent.prototype, "showToolbar", void 0);
__decorate([
    Input({ required: false })
], SimpleSketchCanvasComponent.prototype, "backgroundColor", void 0);
__decorate([
    Input({ required: false })
], SimpleSketchCanvasComponent.prototype, "paintColor", void 0);
__decorate([
    ViewChild('canvas')
], SimpleSketchCanvasComponent.prototype, "canvas", void 0);
SimpleSketchCanvasComponent = __decorate([
    Component({
        selector: 'simple-sketch-canvas',
        standalone: true,
        imports: [
            CommonModule,
            FormsModule,
            MatInputModule,
            SimpleSketchToolbarComponent,
        ],
        providers: [SimpleSketchCanvasStore],
        templateUrl: './canvas.component.html',
        styleUrl: './canvas.component.scss',
        changeDetection: ChangeDetectionStrategy.OnPush,
    })
], SimpleSketchCanvasComponent);
export { SimpleSketchCanvasComponent };
//# sourceMappingURL=canvas.component.js.map