import { __decorate } from "tslib";
import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, } from '@angular/core';
import { SimpleSketchCanvasComponent } from '../simple-sketch/canvas/canvas.component';
import { BehaviorSubject } from 'rxjs';
import { WINDOW } from '../simple-sketch/injection-tokens';
let AppComponent = class AppComponent {
    constructor() {
        this.window = inject(WINDOW);
        this.isDebug = new BehaviorSubject(false);
        this.isDebug$ = this.isDebug;
    }
    ngOnInit() {
        // eslint-disable-next-line node/no-unsupported-features/node-builtins
        const urlParams = new URLSearchParams(this.window.location.search);
        this.isDebug.next(urlParams.get('css-debug') ? true : false);
    }
};
AppComponent = __decorate([
    Component({
        selector: 'app-root',
        standalone: true,
        imports: [CommonModule, SimpleSketchCanvasComponent],
        templateUrl: './app.component.html',
        styleUrl: './app.component.scss',
        changeDetection: ChangeDetectionStrategy.OnPush,
    })
], AppComponent);
export { AppComponent };
//# sourceMappingURL=app.component.js.map