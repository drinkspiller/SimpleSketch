import { EventEmitter } from '@angular/core';
import { Observable } from 'rxjs';
import * as i0 from "@angular/core";
export declare enum Mode {
    ERASE = "erase",
    SKETCH = "sketch"
}
export declare class SimpleSketchToolbarComponent {
    clearCanvas: EventEmitter<void>;
    backgroundColorChange: EventEmitter<string>;
    paintColorChange: EventEmitter<string>;
    modeChange: EventEmitter<Mode>;
    protected backgroundColor$: Observable<string> | null;
    set backgroundColor(backgroundColor: Observable<string>);
    protected paintColor$: Observable<string> | null;
    set paintColor(paintColor: Observable<string>);
    protected mode$: Observable<Mode> | null;
    set mode(mode: Observable<Mode>);
    protected readonly Mode: typeof Mode;
    changeBackgroundColor(newColor: string): void;
    changePaintColor(newColor: string): void;
    changeMode(newMode: Mode): void;
    emitClearCanvas(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<SimpleSketchToolbarComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<SimpleSketchToolbarComponent, "simple-sketch-toolbar", never, { "backgroundColor": { "alias": "backgroundColor"; "required": true; }; "paintColor": { "alias": "paintColor"; "required": true; }; "mode": { "alias": "mode"; "required": true; }; }, { "clearCanvas": "clearCanvas"; "backgroundColorChange": "backgroundColorChange"; "paintColorChange": "paintColorChange"; "modeChange": "modeChange"; }, never, never, true, never>;
}
