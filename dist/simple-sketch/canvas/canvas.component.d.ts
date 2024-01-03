import { AfterViewInit, ElementRef } from '@angular/core';
export declare class SimpleSketchCanvasComponent implements AfterViewInit {
    showToolbar: boolean;
    backgroundColor: string;
    paintColor: string;
    canvas: ElementRef<HTMLCanvasElement> | null;
    private readonly simpleSketchCanvasStore;
    protected readonly backgroundColor$: import("rxjs").Observable<string>;
    protected readonly paintColor$: import("rxjs").Observable<string>;
    ngAfterViewInit(): void;
    changeBackgroundColor(event: Event): void;
    changePaintColor(event: Event): void;
    sketch(event: MouseEvent | TouchEvent): void;
    startSketch(event: MouseEvent | TouchEvent): void;
    stopSketch(event: MouseEvent | TouchEvent): void;
}
