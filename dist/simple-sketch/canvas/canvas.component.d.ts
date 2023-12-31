import { AfterViewInit, ElementRef } from '@angular/core';
import { Mode } from '../toolbar/toolbar.component';
import * as i0 from "@angular/core";
export declare class SimpleSketchCanvasComponent implements AfterViewInit {
    showToolbar: boolean;
    backgroundColor: string;
    paintColor: string;
    canvas: ElementRef<HTMLCanvasElement> | null;
    private readonly simpleSketchCanvasStore;
    protected readonly backgroundColor$: import("rxjs").Observable<string>;
    protected readonly mode$: import("rxjs").Observable<Mode>;
    protected readonly paintColor$: import("rxjs").Observable<string>;
    ngAfterViewInit(): void;
    changeBackgroundColor(newColor: string): void;
    changeMode(newMode: Mode): void;
    changePaintColor(newColor: string): void;
    clearCanvas(): void;
    sketch(event: MouseEvent | TouchEvent): void;
    startSketch(event: MouseEvent | TouchEvent): void;
    stopSketch(event: MouseEvent | TouchEvent): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<SimpleSketchCanvasComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<SimpleSketchCanvasComponent, "simple-sketch-canvas", never, { "showToolbar": { "alias": "showToolbar"; "required": false; }; "backgroundColor": { "alias": "backgroundColor"; "required": false; }; "paintColor": { "alias": "paintColor"; "required": false; }; }, {}, never, never, true, never>;
}
