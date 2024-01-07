import { ChangeDetectionStrategy, Component, inject, Input, ViewChild, } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { shareReplay } from 'rxjs/operators';
import { SimpleSketchToolbarComponent } from '../toolbar/toolbar.component';
import { SimpleSketchCanvasStore } from './canvas.store';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
export class SimpleSketchCanvasComponent {
    showToolbar = true;
    backgroundColor = '#ffffff';
    paintColor = '#000000';
    canvas = null;
    simpleSketchCanvasStore = inject(SimpleSketchCanvasStore);
    backgroundColor$ = this.simpleSketchCanvasStore.backgroundColor$.pipe(shareReplay({ bufferSize: 1, refCount: true }));
    mode$ = this.simpleSketchCanvasStore.mode$.pipe(shareReplay({ bufferSize: 1, refCount: true }));
    paintColor$ = this.simpleSketchCanvasStore.paintColor$.pipe(shareReplay({ bufferSize: 1, refCount: true }));
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
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "17.0.8", ngImport: i0, type: SimpleSketchCanvasComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "17.0.8", type: SimpleSketchCanvasComponent, isStandalone: true, selector: "simple-sketch-canvas", inputs: { showToolbar: "showToolbar", backgroundColor: "backgroundColor", paintColor: "paintColor" }, providers: [SimpleSketchCanvasStore], viewQueries: [{ propertyName: "canvas", first: true, predicate: ["canvas"], descendants: true }], ngImport: i0, template: "<simple-sketch-toolbar\n  *ngIf=\"showToolbar\"\n  [mode]=\"mode$\"\n  [backgroundColor]=\"backgroundColor$\"\n  [paintColor]=\"paintColor$\"\n  (backgroundColorChange)=\"changeBackgroundColor($event)\"\n  (paintColorChange)=\"changePaintColor($event)\"\n  (modeChange)=\"changeMode($event)\"\n  (clearCanvas)=\"clearCanvas()\"\n>\n</simple-sketch-toolbar>\n<section class=\"canvas-wrapper\">\n  <canvas\n    #canvas\n    (mousedown)=\"startSketch($event)\"\n    (mousemove)=\"sketch($event)\"\n    (mouseup)=\"stopSketch($event)\"\n    (touchstart)=\"startSketch($event)\"\n    (touchmove)=\"sketch($event)\"\n    (touchend)=\"stopSketch($event)\"\n  >\n  </canvas>\n</section>\n", styles: [":host{display:flex;flex-direction:column}.canvas-wrapper{display:flex;flex:1}\n"], dependencies: [{ kind: "ngmodule", type: CommonModule }, { kind: "directive", type: i1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "ngmodule", type: FormsModule }, { kind: "ngmodule", type: MatInputModule }, { kind: "component", type: SimpleSketchToolbarComponent, selector: "simple-sketch-toolbar", inputs: ["backgroundColor", "paintColor", "mode"], outputs: ["clearCanvas", "backgroundColorChange", "paintColorChange", "modeChange"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "17.0.8", ngImport: i0, type: SimpleSketchCanvasComponent, decorators: [{
            type: Component,
            args: [{ selector: 'simple-sketch-canvas', standalone: true, imports: [
                        CommonModule,
                        FormsModule,
                        MatInputModule,
                        SimpleSketchToolbarComponent,
                    ], providers: [SimpleSketchCanvasStore], changeDetection: ChangeDetectionStrategy.OnPush, template: "<simple-sketch-toolbar\n  *ngIf=\"showToolbar\"\n  [mode]=\"mode$\"\n  [backgroundColor]=\"backgroundColor$\"\n  [paintColor]=\"paintColor$\"\n  (backgroundColorChange)=\"changeBackgroundColor($event)\"\n  (paintColorChange)=\"changePaintColor($event)\"\n  (modeChange)=\"changeMode($event)\"\n  (clearCanvas)=\"clearCanvas()\"\n>\n</simple-sketch-toolbar>\n<section class=\"canvas-wrapper\">\n  <canvas\n    #canvas\n    (mousedown)=\"startSketch($event)\"\n    (mousemove)=\"sketch($event)\"\n    (mouseup)=\"stopSketch($event)\"\n    (touchstart)=\"startSketch($event)\"\n    (touchmove)=\"sketch($event)\"\n    (touchend)=\"stopSketch($event)\"\n  >\n  </canvas>\n</section>\n", styles: [":host{display:flex;flex-direction:column}.canvas-wrapper{display:flex;flex:1}\n"] }]
        }], propDecorators: { showToolbar: [{
                type: Input,
                args: [{ required: false }]
            }], backgroundColor: [{
                type: Input,
                args: [{ required: false }]
            }], paintColor: [{
                type: Input,
                args: [{ required: false }]
            }], canvas: [{
                type: ViewChild,
                args: ['canvas']
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2FudmFzLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9zaW1wbGUtc2tldGNoL2NhbnZhcy9jYW52YXMuY29tcG9uZW50LnRzIiwiLi4vLi4vLi4vLi4vc3JjL3NpbXBsZS1za2V0Y2gvY2FudmFzL2NhbnZhcy5jb21wb25lbnQuaHRtbCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBRUwsdUJBQXVCLEVBQ3ZCLFNBQVMsRUFFVCxNQUFNLEVBQ04sS0FBSyxFQUNMLFNBQVMsR0FDVixNQUFNLGVBQWUsQ0FBQztBQUV2QixPQUFPLEVBQUMsWUFBWSxFQUFDLE1BQU0saUJBQWlCLENBQUM7QUFDN0MsT0FBTyxFQUFDLFdBQVcsRUFBQyxNQUFNLGdCQUFnQixDQUFDO0FBQzNDLE9BQU8sRUFBQyxjQUFjLEVBQUMsTUFBTSx5QkFBeUIsQ0FBQztBQUN2RCxPQUFPLEVBQUMsV0FBVyxFQUFDLE1BQU0sZ0JBQWdCLENBQUM7QUFDM0MsT0FBTyxFQUFPLDRCQUE0QixFQUFDLE1BQU0sOEJBQThCLENBQUM7QUFDaEYsT0FBTyxFQUFDLHVCQUF1QixFQUFDLE1BQU0sZ0JBQWdCLENBQUM7OztBQWdCdkQsTUFBTSxPQUFPLDJCQUEyQjtJQUNaLFdBQVcsR0FBRyxJQUFJLENBQUM7SUFDbkIsZUFBZSxHQUFHLFNBQVMsQ0FBQztJQUM1QixVQUFVLEdBQUcsU0FBUyxDQUFDO0lBRTVCLE1BQU0sR0FBeUMsSUFBSSxDQUFDO0lBRXhELHVCQUF1QixHQUE0QixNQUFNLENBQ3hFLHVCQUF1QixDQUN4QixDQUFDO0lBQ2lCLGdCQUFnQixHQUNqQyxJQUFJLENBQUMsdUJBQXVCLENBQUMsZ0JBQWdCLENBQUMsSUFBSSxDQUNoRCxXQUFXLENBQUMsRUFBQyxVQUFVLEVBQUUsQ0FBQyxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUMsQ0FBQyxDQUM3QyxDQUFDO0lBQ2UsS0FBSyxHQUFHLElBQUksQ0FBQyx1QkFBdUIsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUNoRSxXQUFXLENBQUMsRUFBQyxVQUFVLEVBQUUsQ0FBQyxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUMsQ0FBQyxDQUM3QyxDQUFDO0lBQ2lCLFdBQVcsR0FDNUIsSUFBSSxDQUFDLHVCQUF1QixDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQzNDLFdBQVcsQ0FBQyxFQUFDLFVBQVUsRUFBRSxDQUFDLEVBQUUsUUFBUSxFQUFFLElBQUksRUFBQyxDQUFDLENBQzdDLENBQUM7SUFFSixlQUFlO1FBQ2IsSUFBSSxJQUFJLENBQUMsTUFBTSxLQUFLLElBQUk7WUFBRSxPQUFPO1FBQ2pDLElBQUksQ0FBQyx1QkFBdUIsQ0FBQyxJQUFJLENBQUM7WUFDaEMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxhQUFhO1lBQ3pCLElBQUksQ0FBQyxlQUFlO1lBQ3BCLElBQUksQ0FBQyxVQUFVO1NBQ2hCLENBQUMsQ0FBQztJQUNMLENBQUM7SUFFRCxxQkFBcUIsQ0FBQyxRQUFnQjtRQUNwQyxJQUFJLENBQUMsdUJBQXVCLENBQUMscUJBQXFCLENBQUMsUUFBUSxDQUFDLENBQUM7SUFDL0QsQ0FBQztJQUVELFVBQVUsQ0FBQyxPQUFhO1FBQ3RCLElBQUksQ0FBQyx1QkFBdUIsQ0FBQyxVQUFVLENBQUMsT0FBTyxDQUFDLENBQUM7SUFDbkQsQ0FBQztJQUVELGdCQUFnQixDQUFDLFFBQWdCO1FBQy9CLElBQUksQ0FBQyx1QkFBdUIsQ0FBQyxnQkFBZ0IsQ0FBQyxRQUFRLENBQUMsQ0FBQztJQUMxRCxDQUFDO0lBRUQsV0FBVztRQUNULElBQUksQ0FBQyx1QkFBdUIsQ0FBQyxXQUFXLEVBQUUsQ0FBQztJQUM3QyxDQUFDO0lBRUQsTUFBTSxDQUFDLEtBQThCO1FBQ25DLElBQUksQ0FBQyx1QkFBdUIsQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDN0MsQ0FBQztJQUVELFdBQVcsQ0FBQyxLQUE4QjtRQUN4QyxJQUFJLENBQUMsdUJBQXVCLENBQUMsV0FBVyxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQ2xELENBQUM7SUFFRCxVQUFVLENBQUMsS0FBOEI7UUFDdkMsSUFBSSxDQUFDLHVCQUF1QixDQUFDLFVBQVUsQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUNqRCxDQUFDO3VHQXpEVSwyQkFBMkI7MkZBQTNCLDJCQUEyQix5S0FMM0IsQ0FBQyx1QkFBdUIsQ0FBQyw0SEMxQnRDLDBxQkF1QkEsd0lERkksWUFBWSxrSUFDWixXQUFXLDhCQUNYLGNBQWMsK0JBQ2QsNEJBQTRCOzsyRkFPbkIsMkJBQTJCO2tCQWR2QyxTQUFTOytCQUNFLHNCQUFzQixjQUNwQixJQUFJLFdBQ1A7d0JBQ1AsWUFBWTt3QkFDWixXQUFXO3dCQUNYLGNBQWM7d0JBQ2QsNEJBQTRCO3FCQUM3QixhQUNVLENBQUMsdUJBQXVCLENBQUMsbUJBR25CLHVCQUF1QixDQUFDLE1BQU07OEJBR3JCLFdBQVc7c0JBQXBDLEtBQUs7dUJBQUMsRUFBQyxRQUFRLEVBQUUsS0FBSyxFQUFDO2dCQUNFLGVBQWU7c0JBQXhDLEtBQUs7dUJBQUMsRUFBQyxRQUFRLEVBQUUsS0FBSyxFQUFDO2dCQUNFLFVBQVU7c0JBQW5DLEtBQUs7dUJBQUMsRUFBQyxRQUFRLEVBQUUsS0FBSyxFQUFDO2dCQUVILE1BQU07c0JBQTFCLFNBQVM7dUJBQUMsUUFBUSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XG4gIEFmdGVyVmlld0luaXQsXG4gIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LFxuICBDb21wb25lbnQsXG4gIEVsZW1lbnRSZWYsXG4gIGluamVjdCxcbiAgSW5wdXQsXG4gIFZpZXdDaGlsZCxcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbmltcG9ydCB7Q29tbW9uTW9kdWxlfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHtGb3Jtc01vZHVsZX0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuaW1wb3J0IHtNYXRJbnB1dE1vZHVsZX0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwvaW5wdXQnO1xuaW1wb3J0IHtzaGFyZVJlcGxheX0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuaW1wb3J0IHtNb2RlLCBTaW1wbGVTa2V0Y2hUb29sYmFyQ29tcG9uZW50fSBmcm9tICcuLi90b29sYmFyL3Rvb2xiYXIuY29tcG9uZW50JztcbmltcG9ydCB7U2ltcGxlU2tldGNoQ2FudmFzU3RvcmV9IGZyb20gJy4vY2FudmFzLnN0b3JlJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnc2ltcGxlLXNrZXRjaC1jYW52YXMnLFxuICBzdGFuZGFsb25lOiB0cnVlLFxuICBpbXBvcnRzOiBbXG4gICAgQ29tbW9uTW9kdWxlLFxuICAgIEZvcm1zTW9kdWxlLFxuICAgIE1hdElucHV0TW9kdWxlLFxuICAgIFNpbXBsZVNrZXRjaFRvb2xiYXJDb21wb25lbnQsXG4gIF0sXG4gIHByb3ZpZGVyczogW1NpbXBsZVNrZXRjaENhbnZhc1N0b3JlXSxcbiAgdGVtcGxhdGVVcmw6ICcuL2NhbnZhcy5jb21wb25lbnQuaHRtbCcsXG4gIHN0eWxlVXJsOiAnLi9jYW52YXMuY29tcG9uZW50LnNjc3MnLFxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcbn0pXG5leHBvcnQgY2xhc3MgU2ltcGxlU2tldGNoQ2FudmFzQ29tcG9uZW50IGltcGxlbWVudHMgQWZ0ZXJWaWV3SW5pdCB7XG4gIEBJbnB1dCh7cmVxdWlyZWQ6IGZhbHNlfSkgc2hvd1Rvb2xiYXIgPSB0cnVlO1xuICBASW5wdXQoe3JlcXVpcmVkOiBmYWxzZX0pIGJhY2tncm91bmRDb2xvciA9ICcjZmZmZmZmJztcbiAgQElucHV0KHtyZXF1aXJlZDogZmFsc2V9KSBwYWludENvbG9yID0gJyMwMDAwMDAnO1xuXG4gIEBWaWV3Q2hpbGQoJ2NhbnZhcycpIGNhbnZhczogRWxlbWVudFJlZjxIVE1MQ2FudmFzRWxlbWVudD4gfCBudWxsID0gbnVsbDtcblxuICBwcml2YXRlIHJlYWRvbmx5IHNpbXBsZVNrZXRjaENhbnZhc1N0b3JlOiBTaW1wbGVTa2V0Y2hDYW52YXNTdG9yZSA9IGluamVjdChcbiAgICBTaW1wbGVTa2V0Y2hDYW52YXNTdG9yZVxuICApO1xuICBwcm90ZWN0ZWQgcmVhZG9ubHkgYmFja2dyb3VuZENvbG9yJCA9XG4gICAgdGhpcy5zaW1wbGVTa2V0Y2hDYW52YXNTdG9yZS5iYWNrZ3JvdW5kQ29sb3IkLnBpcGUoXG4gICAgICBzaGFyZVJlcGxheSh7YnVmZmVyU2l6ZTogMSwgcmVmQ291bnQ6IHRydWV9KVxuICAgICk7XG4gIHByb3RlY3RlZCByZWFkb25seSBtb2RlJCA9IHRoaXMuc2ltcGxlU2tldGNoQ2FudmFzU3RvcmUubW9kZSQucGlwZShcbiAgICBzaGFyZVJlcGxheSh7YnVmZmVyU2l6ZTogMSwgcmVmQ291bnQ6IHRydWV9KVxuICApO1xuICBwcm90ZWN0ZWQgcmVhZG9ubHkgcGFpbnRDb2xvciQgPVxuICAgIHRoaXMuc2ltcGxlU2tldGNoQ2FudmFzU3RvcmUucGFpbnRDb2xvciQucGlwZShcbiAgICAgIHNoYXJlUmVwbGF5KHtidWZmZXJTaXplOiAxLCByZWZDb3VudDogdHJ1ZX0pXG4gICAgKTtcblxuICBuZ0FmdGVyVmlld0luaXQoKTogdm9pZCB7XG4gICAgaWYgKHRoaXMuY2FudmFzID09PSBudWxsKSByZXR1cm47XG4gICAgdGhpcy5zaW1wbGVTa2V0Y2hDYW52YXNTdG9yZS5pbml0KFtcbiAgICAgIHRoaXMuY2FudmFzLm5hdGl2ZUVsZW1lbnQsXG4gICAgICB0aGlzLmJhY2tncm91bmRDb2xvcixcbiAgICAgIHRoaXMucGFpbnRDb2xvcixcbiAgICBdKTtcbiAgfVxuXG4gIGNoYW5nZUJhY2tncm91bmRDb2xvcihuZXdDb2xvcjogc3RyaW5nKSB7XG4gICAgdGhpcy5zaW1wbGVTa2V0Y2hDYW52YXNTdG9yZS51cGRhdGVCYWNrR3JvdW5kQ29sb3IobmV3Q29sb3IpO1xuICB9XG5cbiAgY2hhbmdlTW9kZShuZXdNb2RlOiBNb2RlKSB7XG4gICAgdGhpcy5zaW1wbGVTa2V0Y2hDYW52YXNTdG9yZS51cGRhdGVNb2RlKG5ld01vZGUpO1xuICB9XG5cbiAgY2hhbmdlUGFpbnRDb2xvcihuZXdDb2xvcjogc3RyaW5nKSB7XG4gICAgdGhpcy5zaW1wbGVTa2V0Y2hDYW52YXNTdG9yZS51cGRhdGVQYWludENvbG9yKG5ld0NvbG9yKTtcbiAgfVxuXG4gIGNsZWFyQ2FudmFzKCkge1xuICAgIHRoaXMuc2ltcGxlU2tldGNoQ2FudmFzU3RvcmUuY2xlYXJDYW52YXMoKTtcbiAgfVxuXG4gIHNrZXRjaChldmVudDogTW91c2VFdmVudCB8IFRvdWNoRXZlbnQpIHtcbiAgICB0aGlzLnNpbXBsZVNrZXRjaENhbnZhc1N0b3JlLnNrZXRjaChldmVudCk7XG4gIH1cblxuICBzdGFydFNrZXRjaChldmVudDogTW91c2VFdmVudCB8IFRvdWNoRXZlbnQpIHtcbiAgICB0aGlzLnNpbXBsZVNrZXRjaENhbnZhc1N0b3JlLnN0YXJ0U2tldGNoKGV2ZW50KTtcbiAgfVxuXG4gIHN0b3BTa2V0Y2goZXZlbnQ6IE1vdXNlRXZlbnQgfCBUb3VjaEV2ZW50KSB7XG4gICAgdGhpcy5zaW1wbGVTa2V0Y2hDYW52YXNTdG9yZS5zdG9wU2tldGNoKGV2ZW50KTtcbiAgfVxufVxuIiwiPHNpbXBsZS1za2V0Y2gtdG9vbGJhclxuICAqbmdJZj1cInNob3dUb29sYmFyXCJcbiAgW21vZGVdPVwibW9kZSRcIlxuICBbYmFja2dyb3VuZENvbG9yXT1cImJhY2tncm91bmRDb2xvciRcIlxuICBbcGFpbnRDb2xvcl09XCJwYWludENvbG9yJFwiXG4gIChiYWNrZ3JvdW5kQ29sb3JDaGFuZ2UpPVwiY2hhbmdlQmFja2dyb3VuZENvbG9yKCRldmVudClcIlxuICAocGFpbnRDb2xvckNoYW5nZSk9XCJjaGFuZ2VQYWludENvbG9yKCRldmVudClcIlxuICAobW9kZUNoYW5nZSk9XCJjaGFuZ2VNb2RlKCRldmVudClcIlxuICAoY2xlYXJDYW52YXMpPVwiY2xlYXJDYW52YXMoKVwiXG4+XG48L3NpbXBsZS1za2V0Y2gtdG9vbGJhcj5cbjxzZWN0aW9uIGNsYXNzPVwiY2FudmFzLXdyYXBwZXJcIj5cbiAgPGNhbnZhc1xuICAgICNjYW52YXNcbiAgICAobW91c2Vkb3duKT1cInN0YXJ0U2tldGNoKCRldmVudClcIlxuICAgIChtb3VzZW1vdmUpPVwic2tldGNoKCRldmVudClcIlxuICAgIChtb3VzZXVwKT1cInN0b3BTa2V0Y2goJGV2ZW50KVwiXG4gICAgKHRvdWNoc3RhcnQpPVwic3RhcnRTa2V0Y2goJGV2ZW50KVwiXG4gICAgKHRvdWNobW92ZSk9XCJza2V0Y2goJGV2ZW50KVwiXG4gICAgKHRvdWNoZW5kKT1cInN0b3BTa2V0Y2goJGV2ZW50KVwiXG4gID5cbiAgPC9jYW52YXM+XG48L3NlY3Rpb24+XG4iXX0=