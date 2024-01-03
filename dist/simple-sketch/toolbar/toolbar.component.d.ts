import { Mode } from '../canvas/canvas.store';
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
}
