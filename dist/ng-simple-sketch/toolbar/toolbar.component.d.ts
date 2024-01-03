import { Mode } from '../canvas/canvas.store';
import * as i0 from "@angular/core";
export declare class SimpleSketchToolbarComponent {
    private readonly simpleSketchCanvasStore;
    protected readonly backgroundColor$: import("rxjs").Observable<string>;
    protected readonly paintColor$: import("rxjs").Observable<string>;
    protected readonly mode$: import("rxjs").Observable<Mode>;
    readonly Mode: typeof Mode;
    changeBackgroundColor(newColor: string): void;
    changeMode(newMode: Mode): void;
    changePaintColor(newColor: string): void;
    clearCanvas(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<SimpleSketchToolbarComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<SimpleSketchToolbarComponent, "simple-sketch-toolbar", never, {}, {}, never, never, true, never>;
}
