import { ChangeDetectionStrategy, Component, inject, Input, ViewChild, } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { shareReplay } from 'rxjs/operators';
import { SimpleSketchToolbarComponent } from '../toolbar/toolbar.component';
import { SimpleSketchCanvasStore } from './canvas.component.store';
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2FudmFzLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9zaW1wbGUtc2tldGNoL2NhbnZhcy9jYW52YXMuY29tcG9uZW50LnRzIiwiLi4vLi4vLi4vLi4vc3JjL3NpbXBsZS1za2V0Y2gvY2FudmFzL2NhbnZhcy5jb21wb25lbnQuaHRtbCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBRUwsdUJBQXVCLEVBQ3ZCLFNBQVMsRUFFVCxNQUFNLEVBQ04sS0FBSyxFQUNMLFNBQVMsR0FDVixNQUFNLGVBQWUsQ0FBQztBQUV2QixPQUFPLEVBQUMsWUFBWSxFQUFDLE1BQU0saUJBQWlCLENBQUM7QUFDN0MsT0FBTyxFQUFDLFdBQVcsRUFBQyxNQUFNLGdCQUFnQixDQUFDO0FBQzNDLE9BQU8sRUFBQyxjQUFjLEVBQUMsTUFBTSx5QkFBeUIsQ0FBQztBQUN2RCxPQUFPLEVBQUMsV0FBVyxFQUFDLE1BQU0sZ0JBQWdCLENBQUM7QUFDM0MsT0FBTyxFQUFPLDRCQUE0QixFQUFDLE1BQU0sOEJBQThCLENBQUM7QUFDaEYsT0FBTyxFQUFDLHVCQUF1QixFQUFDLE1BQU0sMEJBQTBCLENBQUM7OztBQWdCakUsTUFBTSxPQUFPLDJCQUEyQjtJQUNaLFdBQVcsR0FBRyxJQUFJLENBQUM7SUFDbkIsZUFBZSxHQUFHLFNBQVMsQ0FBQztJQUM1QixVQUFVLEdBQUcsU0FBUyxDQUFDO0lBRTVCLE1BQU0sR0FBeUMsSUFBSSxDQUFDO0lBRXhELHVCQUF1QixHQUE0QixNQUFNLENBQ3hFLHVCQUF1QixDQUN4QixDQUFDO0lBQ2lCLGdCQUFnQixHQUNqQyxJQUFJLENBQUMsdUJBQXVCLENBQUMsZ0JBQWdCLENBQUMsSUFBSSxDQUNoRCxXQUFXLENBQUMsRUFBQyxVQUFVLEVBQUUsQ0FBQyxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUMsQ0FBQyxDQUM3QyxDQUFDO0lBQ2UsS0FBSyxHQUFHLElBQUksQ0FBQyx1QkFBdUIsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUNoRSxXQUFXLENBQUMsRUFBQyxVQUFVLEVBQUUsQ0FBQyxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUMsQ0FBQyxDQUM3QyxDQUFDO0lBQ2lCLFdBQVcsR0FDNUIsSUFBSSxDQUFDLHVCQUF1QixDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQzNDLFdBQVcsQ0FBQyxFQUFDLFVBQVUsRUFBRSxDQUFDLEVBQUUsUUFBUSxFQUFFLElBQUksRUFBQyxDQUFDLENBQzdDLENBQUM7SUFFSixlQUFlO1FBQ2IsSUFBSSxJQUFJLENBQUMsTUFBTSxLQUFLLElBQUk7WUFBRSxPQUFPO1FBQ2pDLElBQUksQ0FBQyx1QkFBdUIsQ0FBQyxJQUFJLENBQUM7WUFDaEMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxhQUFhO1lBQ3pCLElBQUksQ0FBQyxlQUFlO1lBQ3BCLElBQUksQ0FBQyxVQUFVO1NBQ2hCLENBQUMsQ0FBQztJQUNMLENBQUM7SUFFRCxxQkFBcUIsQ0FBQyxRQUFnQjtRQUNwQyxJQUFJLENBQUMsdUJBQXVCLENBQUMscUJBQXFCLENBQUMsUUFBUSxDQUFDLENBQUM7SUFDL0QsQ0FBQztJQUVELFVBQVUsQ0FBQyxPQUFhO1FBQ3RCLElBQUksQ0FBQyx1QkFBdUIsQ0FBQyxVQUFVLENBQUMsT0FBTyxDQUFDLENBQUM7SUFDbkQsQ0FBQztJQUVELGdCQUFnQixDQUFDLFFBQWdCO1FBQy9CLElBQUksQ0FBQyx1QkFBdUIsQ0FBQyxnQkFBZ0IsQ0FBQyxRQUFRLENBQUMsQ0FBQztJQUMxRCxDQUFDO0lBRUQsV0FBVztRQUNULElBQUksQ0FBQyx1QkFBdUIsQ0FBQyxXQUFXLEVBQUUsQ0FBQztJQUM3QyxDQUFDO0lBRUQsTUFBTSxDQUFDLEtBQThCO1FBQ25DLElBQUksQ0FBQyx1QkFBdUIsQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDN0MsQ0FBQztJQUVELFdBQVcsQ0FBQyxLQUE4QjtRQUN4QyxJQUFJLENBQUMsdUJBQXVCLENBQUMsV0FBVyxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQ2xELENBQUM7SUFFRCxVQUFVLENBQUMsS0FBOEI7UUFDdkMsSUFBSSxDQUFDLHVCQUF1QixDQUFDLFVBQVUsQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUNqRCxDQUFDO3VHQXpEVSwyQkFBMkI7MkZBQTNCLDJCQUEyQix5S0FMM0IsQ0FBQyx1QkFBdUIsQ0FBQyw0SEMxQnRDLDBxQkF1QkEsd0lERkksWUFBWSxrSUFDWixXQUFXLDhCQUNYLGNBQWMsK0JBQ2QsNEJBQTRCOzsyRkFPbkIsMkJBQTJCO2tCQWR2QyxTQUFTOytCQUNFLHNCQUFzQixjQUNwQixJQUFJLFdBQ1A7d0JBQ1AsWUFBWTt3QkFDWixXQUFXO3dCQUNYLGNBQWM7d0JBQ2QsNEJBQTRCO3FCQUM3QixhQUNVLENBQUMsdUJBQXVCLENBQUMsbUJBR25CLHVCQUF1QixDQUFDLE1BQU07OEJBR3JCLFdBQVc7c0JBQXBDLEtBQUs7dUJBQUMsRUFBQyxRQUFRLEVBQUUsS0FBSyxFQUFDO2dCQUNFLGVBQWU7c0JBQXhDLEtBQUs7dUJBQUMsRUFBQyxRQUFRLEVBQUUsS0FBSyxFQUFDO2dCQUNFLFVBQVU7c0JBQW5DLEtBQUs7dUJBQUMsRUFBQyxRQUFRLEVBQUUsS0FBSyxFQUFDO2dCQUVILE1BQU07c0JBQTFCLFNBQVM7dUJBQUMsUUFBUSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XG4gIEFmdGVyVmlld0luaXQsXG4gIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LFxuICBDb21wb25lbnQsXG4gIEVsZW1lbnRSZWYsXG4gIGluamVjdCxcbiAgSW5wdXQsXG4gIFZpZXdDaGlsZCxcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbmltcG9ydCB7Q29tbW9uTW9kdWxlfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHtGb3Jtc01vZHVsZX0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuaW1wb3J0IHtNYXRJbnB1dE1vZHVsZX0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwvaW5wdXQnO1xuaW1wb3J0IHtzaGFyZVJlcGxheX0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuaW1wb3J0IHtNb2RlLCBTaW1wbGVTa2V0Y2hUb29sYmFyQ29tcG9uZW50fSBmcm9tICcuLi90b29sYmFyL3Rvb2xiYXIuY29tcG9uZW50JztcbmltcG9ydCB7U2ltcGxlU2tldGNoQ2FudmFzU3RvcmV9IGZyb20gJy4vY2FudmFzLmNvbXBvbmVudC5zdG9yZSc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ3NpbXBsZS1za2V0Y2gtY2FudmFzJyxcbiAgc3RhbmRhbG9uZTogdHJ1ZSxcbiAgaW1wb3J0czogW1xuICAgIENvbW1vbk1vZHVsZSxcbiAgICBGb3Jtc01vZHVsZSxcbiAgICBNYXRJbnB1dE1vZHVsZSxcbiAgICBTaW1wbGVTa2V0Y2hUb29sYmFyQ29tcG9uZW50LFxuICBdLFxuICBwcm92aWRlcnM6IFtTaW1wbGVTa2V0Y2hDYW52YXNTdG9yZV0sXG4gIHRlbXBsYXRlVXJsOiAnLi9jYW52YXMuY29tcG9uZW50Lmh0bWwnLFxuICBzdHlsZVVybDogJy4vY2FudmFzLmNvbXBvbmVudC5zY3NzJyxcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXG59KVxuZXhwb3J0IGNsYXNzIFNpbXBsZVNrZXRjaENhbnZhc0NvbXBvbmVudCBpbXBsZW1lbnRzIEFmdGVyVmlld0luaXQge1xuICBASW5wdXQoe3JlcXVpcmVkOiBmYWxzZX0pIHNob3dUb29sYmFyID0gdHJ1ZTtcbiAgQElucHV0KHtyZXF1aXJlZDogZmFsc2V9KSBiYWNrZ3JvdW5kQ29sb3IgPSAnI2ZmZmZmZic7XG4gIEBJbnB1dCh7cmVxdWlyZWQ6IGZhbHNlfSkgcGFpbnRDb2xvciA9ICcjMDAwMDAwJztcblxuICBAVmlld0NoaWxkKCdjYW52YXMnKSBjYW52YXM6IEVsZW1lbnRSZWY8SFRNTENhbnZhc0VsZW1lbnQ+IHwgbnVsbCA9IG51bGw7XG5cbiAgcHJpdmF0ZSByZWFkb25seSBzaW1wbGVTa2V0Y2hDYW52YXNTdG9yZTogU2ltcGxlU2tldGNoQ2FudmFzU3RvcmUgPSBpbmplY3QoXG4gICAgU2ltcGxlU2tldGNoQ2FudmFzU3RvcmVcbiAgKTtcbiAgcHJvdGVjdGVkIHJlYWRvbmx5IGJhY2tncm91bmRDb2xvciQgPVxuICAgIHRoaXMuc2ltcGxlU2tldGNoQ2FudmFzU3RvcmUuYmFja2dyb3VuZENvbG9yJC5waXBlKFxuICAgICAgc2hhcmVSZXBsYXkoe2J1ZmZlclNpemU6IDEsIHJlZkNvdW50OiB0cnVlfSlcbiAgICApO1xuICBwcm90ZWN0ZWQgcmVhZG9ubHkgbW9kZSQgPSB0aGlzLnNpbXBsZVNrZXRjaENhbnZhc1N0b3JlLm1vZGUkLnBpcGUoXG4gICAgc2hhcmVSZXBsYXkoe2J1ZmZlclNpemU6IDEsIHJlZkNvdW50OiB0cnVlfSlcbiAgKTtcbiAgcHJvdGVjdGVkIHJlYWRvbmx5IHBhaW50Q29sb3IkID1cbiAgICB0aGlzLnNpbXBsZVNrZXRjaENhbnZhc1N0b3JlLnBhaW50Q29sb3IkLnBpcGUoXG4gICAgICBzaGFyZVJlcGxheSh7YnVmZmVyU2l6ZTogMSwgcmVmQ291bnQ6IHRydWV9KVxuICAgICk7XG5cbiAgbmdBZnRlclZpZXdJbml0KCk6IHZvaWQge1xuICAgIGlmICh0aGlzLmNhbnZhcyA9PT0gbnVsbCkgcmV0dXJuO1xuICAgIHRoaXMuc2ltcGxlU2tldGNoQ2FudmFzU3RvcmUuaW5pdChbXG4gICAgICB0aGlzLmNhbnZhcy5uYXRpdmVFbGVtZW50LFxuICAgICAgdGhpcy5iYWNrZ3JvdW5kQ29sb3IsXG4gICAgICB0aGlzLnBhaW50Q29sb3IsXG4gICAgXSk7XG4gIH1cblxuICBjaGFuZ2VCYWNrZ3JvdW5kQ29sb3IobmV3Q29sb3I6IHN0cmluZykge1xuICAgIHRoaXMuc2ltcGxlU2tldGNoQ2FudmFzU3RvcmUudXBkYXRlQmFja0dyb3VuZENvbG9yKG5ld0NvbG9yKTtcbiAgfVxuXG4gIGNoYW5nZU1vZGUobmV3TW9kZTogTW9kZSkge1xuICAgIHRoaXMuc2ltcGxlU2tldGNoQ2FudmFzU3RvcmUudXBkYXRlTW9kZShuZXdNb2RlKTtcbiAgfVxuXG4gIGNoYW5nZVBhaW50Q29sb3IobmV3Q29sb3I6IHN0cmluZykge1xuICAgIHRoaXMuc2ltcGxlU2tldGNoQ2FudmFzU3RvcmUudXBkYXRlUGFpbnRDb2xvcihuZXdDb2xvcik7XG4gIH1cblxuICBjbGVhckNhbnZhcygpIHtcbiAgICB0aGlzLnNpbXBsZVNrZXRjaENhbnZhc1N0b3JlLmNsZWFyQ2FudmFzKCk7XG4gIH1cblxuICBza2V0Y2goZXZlbnQ6IE1vdXNlRXZlbnQgfCBUb3VjaEV2ZW50KSB7XG4gICAgdGhpcy5zaW1wbGVTa2V0Y2hDYW52YXNTdG9yZS5za2V0Y2goZXZlbnQpO1xuICB9XG5cbiAgc3RhcnRTa2V0Y2goZXZlbnQ6IE1vdXNlRXZlbnQgfCBUb3VjaEV2ZW50KSB7XG4gICAgdGhpcy5zaW1wbGVTa2V0Y2hDYW52YXNTdG9yZS5zdGFydFNrZXRjaChldmVudCk7XG4gIH1cblxuICBzdG9wU2tldGNoKGV2ZW50OiBNb3VzZUV2ZW50IHwgVG91Y2hFdmVudCkge1xuICAgIHRoaXMuc2ltcGxlU2tldGNoQ2FudmFzU3RvcmUuc3RvcFNrZXRjaChldmVudCk7XG4gIH1cbn1cbiIsIjxzaW1wbGUtc2tldGNoLXRvb2xiYXJcbiAgKm5nSWY9XCJzaG93VG9vbGJhclwiXG4gIFttb2RlXT1cIm1vZGUkXCJcbiAgW2JhY2tncm91bmRDb2xvcl09XCJiYWNrZ3JvdW5kQ29sb3IkXCJcbiAgW3BhaW50Q29sb3JdPVwicGFpbnRDb2xvciRcIlxuICAoYmFja2dyb3VuZENvbG9yQ2hhbmdlKT1cImNoYW5nZUJhY2tncm91bmRDb2xvcigkZXZlbnQpXCJcbiAgKHBhaW50Q29sb3JDaGFuZ2UpPVwiY2hhbmdlUGFpbnRDb2xvcigkZXZlbnQpXCJcbiAgKG1vZGVDaGFuZ2UpPVwiY2hhbmdlTW9kZSgkZXZlbnQpXCJcbiAgKGNsZWFyQ2FudmFzKT1cImNsZWFyQ2FudmFzKClcIlxuPlxuPC9zaW1wbGUtc2tldGNoLXRvb2xiYXI+XG48c2VjdGlvbiBjbGFzcz1cImNhbnZhcy13cmFwcGVyXCI+XG4gIDxjYW52YXNcbiAgICAjY2FudmFzXG4gICAgKG1vdXNlZG93bik9XCJzdGFydFNrZXRjaCgkZXZlbnQpXCJcbiAgICAobW91c2Vtb3ZlKT1cInNrZXRjaCgkZXZlbnQpXCJcbiAgICAobW91c2V1cCk9XCJzdG9wU2tldGNoKCRldmVudClcIlxuICAgICh0b3VjaHN0YXJ0KT1cInN0YXJ0U2tldGNoKCRldmVudClcIlxuICAgICh0b3VjaG1vdmUpPVwic2tldGNoKCRldmVudClcIlxuICAgICh0b3VjaGVuZCk9XCJzdG9wU2tldGNoKCRldmVudClcIlxuICA+XG4gIDwvY2FudmFzPlxuPC9zZWN0aW9uPlxuIl19