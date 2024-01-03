import { __decorate } from "tslib";
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { SimpleSketchCanvasComponent } from '../simple-sketch/canvas/canvas.component';
let AppComponent = class AppComponent {
};
AppComponent = __decorate([
    Component({
        selector: 'app-root',
        standalone: true,
        imports: [CommonModule, SimpleSketchCanvasComponent],
        templateUrl: './app.component.html',
        styleUrl: './app.component.scss',
    })
], AppComponent);
export { AppComponent };
//# sourceMappingURL=app.component.js.map