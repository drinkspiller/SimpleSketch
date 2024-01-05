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
    changeBackgroundColor(event) {
        this.simpleSketchCanvasStore.updateBackGroundColor(event.target.value);
    }
    changePaintColor(event) {
        this.simpleSketchCanvasStore.updatePaintColor(event.target.value);
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
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "17.0.8", type: SimpleSketchCanvasComponent, isStandalone: true, selector: "simple-sketch-canvas", inputs: { showToolbar: "showToolbar", backgroundColor: "backgroundColor", paintColor: "paintColor" }, providers: [SimpleSketchCanvasStore], viewQueries: [{ propertyName: "canvas", first: true, predicate: ["canvas"], descendants: true }], ngImport: i0, template: "<simple-sketch-toolbar *ngIf=\"showToolbar\"></simple-sketch-toolbar>\n<section class=\"canvas-wrapper\">\n  <canvas #canvas\n      (mousedown)=\"startSketch($event)\"\n      (touchstart)=\"startSketch($event)\"\n      (mouseup)=\"stopSketch($event)\"\n      (touchend)=\"stopSketch($event)\"\n      (mousemove)=\"sketch($event)\"\n      (touchmove)=\"sketch($event)\"\n  >\n  </canvas>\n</section>\n\n", styles: [":host{display:flex;flex-direction:column}.canvas-wrapper{display:flex;flex:1}\n"], dependencies: [{ kind: "ngmodule", type: CommonModule }, { kind: "directive", type: i1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "ngmodule", type: FormsModule }, { kind: "ngmodule", type: MatInputModule }, { kind: "component", type: SimpleSketchToolbarComponent, selector: "simple-sketch-toolbar" }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "17.0.8", ngImport: i0, type: SimpleSketchCanvasComponent, decorators: [{
            type: Component,
            args: [{ selector: 'simple-sketch-canvas', standalone: true, imports: [
                        CommonModule,
                        FormsModule,
                        MatInputModule,
                        SimpleSketchToolbarComponent,
                    ], providers: [SimpleSketchCanvasStore], changeDetection: ChangeDetectionStrategy.OnPush, template: "<simple-sketch-toolbar *ngIf=\"showToolbar\"></simple-sketch-toolbar>\n<section class=\"canvas-wrapper\">\n  <canvas #canvas\n      (mousedown)=\"startSketch($event)\"\n      (touchstart)=\"startSketch($event)\"\n      (mouseup)=\"stopSketch($event)\"\n      (touchend)=\"stopSketch($event)\"\n      (mousemove)=\"sketch($event)\"\n      (touchmove)=\"sketch($event)\"\n  >\n  </canvas>\n</section>\n\n", styles: [":host{display:flex;flex-direction:column}.canvas-wrapper{display:flex;flex:1}\n"] }]
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2FudmFzLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9zaW1wbGUtc2tldGNoL2NhbnZhcy9jYW52YXMuY29tcG9uZW50LnRzIiwiLi4vLi4vLi4vLi4vc3JjL3NpbXBsZS1za2V0Y2gvY2FudmFzL2NhbnZhcy5jb21wb25lbnQuaHRtbCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBRUwsdUJBQXVCLEVBQ3ZCLFNBQVMsRUFFVCxNQUFNLEVBQ04sS0FBSyxFQUNMLFNBQVMsR0FDVixNQUFNLGVBQWUsQ0FBQztBQUV2QixPQUFPLEVBQUMsWUFBWSxFQUFDLE1BQU0saUJBQWlCLENBQUM7QUFDN0MsT0FBTyxFQUFDLFdBQVcsRUFBQyxNQUFNLGdCQUFnQixDQUFDO0FBQzNDLE9BQU8sRUFBQyxjQUFjLEVBQUMsTUFBTSx5QkFBeUIsQ0FBQztBQUN2RCxPQUFPLEVBQUMsV0FBVyxFQUFDLE1BQU0sZ0JBQWdCLENBQUM7QUFDM0MsT0FBTyxFQUFDLDRCQUE0QixFQUFDLE1BQU0sOEJBQThCLENBQUM7QUFDMUUsT0FBTyxFQUFDLHVCQUF1QixFQUFDLE1BQU0sZ0JBQWdCLENBQUM7OztBQWdCdkQsTUFBTSxPQUFPLDJCQUEyQjtJQUNaLFdBQVcsR0FBRyxJQUFJLENBQUM7SUFDbkIsZUFBZSxHQUFHLFNBQVMsQ0FBQztJQUM1QixVQUFVLEdBQUcsU0FBUyxDQUFDO0lBRTVCLE1BQU0sR0FBeUMsSUFBSSxDQUFDO0lBRXhELHVCQUF1QixHQUE0QixNQUFNLENBQ3hFLHVCQUF1QixDQUN4QixDQUFDO0lBQ2lCLGdCQUFnQixHQUNqQyxJQUFJLENBQUMsdUJBQXVCLENBQUMsZ0JBQWdCLENBQUMsSUFBSSxDQUNoRCxXQUFXLENBQUMsRUFBQyxVQUFVLEVBQUUsQ0FBQyxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUMsQ0FBQyxDQUM3QyxDQUFDO0lBQ2UsV0FBVyxHQUM1QixJQUFJLENBQUMsdUJBQXVCLENBQUMsV0FBVyxDQUFDLElBQUksQ0FDM0MsV0FBVyxDQUFDLEVBQUMsVUFBVSxFQUFFLENBQUMsRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFDLENBQUMsQ0FDN0MsQ0FBQztJQUVKLGVBQWU7UUFDYixJQUFJLElBQUksQ0FBQyxNQUFNLEtBQUssSUFBSTtZQUFFLE9BQU87UUFDakMsSUFBSSxDQUFDLHVCQUF1QixDQUFDLElBQUksQ0FBQztZQUNoQyxJQUFJLENBQUMsTUFBTSxDQUFDLGFBQWE7WUFDekIsSUFBSSxDQUFDLGVBQWU7WUFDcEIsSUFBSSxDQUFDLFVBQVU7U0FDaEIsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztJQUVELHFCQUFxQixDQUFDLEtBQVk7UUFDaEMsSUFBSSxDQUFDLHVCQUF1QixDQUFDLHFCQUFxQixDQUMvQyxLQUFLLENBQUMsTUFBMkIsQ0FBQyxLQUFLLENBQ3pDLENBQUM7SUFDSixDQUFDO0lBRUQsZ0JBQWdCLENBQUMsS0FBWTtRQUMzQixJQUFJLENBQUMsdUJBQXVCLENBQUMsZ0JBQWdCLENBQzFDLEtBQUssQ0FBQyxNQUEyQixDQUFDLEtBQUssQ0FDekMsQ0FBQztJQUNKLENBQUM7SUFFRCxNQUFNLENBQUMsS0FBOEI7UUFDbkMsSUFBSSxDQUFDLHVCQUF1QixDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUM3QyxDQUFDO0lBRUQsV0FBVyxDQUFDLEtBQThCO1FBQ3hDLElBQUksQ0FBQyx1QkFBdUIsQ0FBQyxXQUFXLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDbEQsQ0FBQztJQUVELFVBQVUsQ0FBQyxLQUE4QjtRQUN2QyxJQUFJLENBQUMsdUJBQXVCLENBQUMsVUFBVSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQ2pELENBQUM7dUdBbERVLDJCQUEyQjsyRkFBM0IsMkJBQTJCLHlLQUwzQixDQUFDLHVCQUF1QixDQUFDLDRIQzFCdEMsb1pBYUEsd0lEUUksWUFBWSxrSUFDWixXQUFXLDhCQUNYLGNBQWMsK0JBQ2QsNEJBQTRCOzsyRkFPbkIsMkJBQTJCO2tCQWR2QyxTQUFTOytCQUNFLHNCQUFzQixjQUNwQixJQUFJLFdBQ1A7d0JBQ1AsWUFBWTt3QkFDWixXQUFXO3dCQUNYLGNBQWM7d0JBQ2QsNEJBQTRCO3FCQUM3QixhQUNVLENBQUMsdUJBQXVCLENBQUMsbUJBR25CLHVCQUF1QixDQUFDLE1BQU07OEJBR3JCLFdBQVc7c0JBQXBDLEtBQUs7dUJBQUMsRUFBQyxRQUFRLEVBQUUsS0FBSyxFQUFDO2dCQUNFLGVBQWU7c0JBQXhDLEtBQUs7dUJBQUMsRUFBQyxRQUFRLEVBQUUsS0FBSyxFQUFDO2dCQUNFLFVBQVU7c0JBQW5DLEtBQUs7dUJBQUMsRUFBQyxRQUFRLEVBQUUsS0FBSyxFQUFDO2dCQUVILE1BQU07c0JBQTFCLFNBQVM7dUJBQUMsUUFBUSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XG4gIEFmdGVyVmlld0luaXQsXG4gIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LFxuICBDb21wb25lbnQsXG4gIEVsZW1lbnRSZWYsXG4gIGluamVjdCxcbiAgSW5wdXQsXG4gIFZpZXdDaGlsZCxcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbmltcG9ydCB7Q29tbW9uTW9kdWxlfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHtGb3Jtc01vZHVsZX0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuaW1wb3J0IHtNYXRJbnB1dE1vZHVsZX0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwvaW5wdXQnO1xuaW1wb3J0IHtzaGFyZVJlcGxheX0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuaW1wb3J0IHtTaW1wbGVTa2V0Y2hUb29sYmFyQ29tcG9uZW50fSBmcm9tICcuLi90b29sYmFyL3Rvb2xiYXIuY29tcG9uZW50JztcbmltcG9ydCB7U2ltcGxlU2tldGNoQ2FudmFzU3RvcmV9IGZyb20gJy4vY2FudmFzLnN0b3JlJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnc2ltcGxlLXNrZXRjaC1jYW52YXMnLFxuICBzdGFuZGFsb25lOiB0cnVlLFxuICBpbXBvcnRzOiBbXG4gICAgQ29tbW9uTW9kdWxlLFxuICAgIEZvcm1zTW9kdWxlLFxuICAgIE1hdElucHV0TW9kdWxlLFxuICAgIFNpbXBsZVNrZXRjaFRvb2xiYXJDb21wb25lbnQsXG4gIF0sXG4gIHByb3ZpZGVyczogW1NpbXBsZVNrZXRjaENhbnZhc1N0b3JlXSxcbiAgdGVtcGxhdGVVcmw6ICcuL2NhbnZhcy5jb21wb25lbnQuaHRtbCcsXG4gIHN0eWxlVXJsOiAnLi9jYW52YXMuY29tcG9uZW50LnNjc3MnLFxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcbn0pXG5leHBvcnQgY2xhc3MgU2ltcGxlU2tldGNoQ2FudmFzQ29tcG9uZW50IGltcGxlbWVudHMgQWZ0ZXJWaWV3SW5pdCB7XG4gIEBJbnB1dCh7cmVxdWlyZWQ6IGZhbHNlfSkgc2hvd1Rvb2xiYXIgPSB0cnVlO1xuICBASW5wdXQoe3JlcXVpcmVkOiBmYWxzZX0pIGJhY2tncm91bmRDb2xvciA9ICcjZmZmZmZmJztcbiAgQElucHV0KHtyZXF1aXJlZDogZmFsc2V9KSBwYWludENvbG9yID0gJyMwMDAwMDAnO1xuXG4gIEBWaWV3Q2hpbGQoJ2NhbnZhcycpIGNhbnZhczogRWxlbWVudFJlZjxIVE1MQ2FudmFzRWxlbWVudD4gfCBudWxsID0gbnVsbDtcblxuICBwcml2YXRlIHJlYWRvbmx5IHNpbXBsZVNrZXRjaENhbnZhc1N0b3JlOiBTaW1wbGVTa2V0Y2hDYW52YXNTdG9yZSA9IGluamVjdChcbiAgICBTaW1wbGVTa2V0Y2hDYW52YXNTdG9yZVxuICApO1xuICBwcm90ZWN0ZWQgcmVhZG9ubHkgYmFja2dyb3VuZENvbG9yJCA9XG4gICAgdGhpcy5zaW1wbGVTa2V0Y2hDYW52YXNTdG9yZS5iYWNrZ3JvdW5kQ29sb3IkLnBpcGUoXG4gICAgICBzaGFyZVJlcGxheSh7YnVmZmVyU2l6ZTogMSwgcmVmQ291bnQ6IHRydWV9KVxuICAgICk7XG4gIHByb3RlY3RlZCByZWFkb25seSBwYWludENvbG9yJCA9XG4gICAgdGhpcy5zaW1wbGVTa2V0Y2hDYW52YXNTdG9yZS5wYWludENvbG9yJC5waXBlKFxuICAgICAgc2hhcmVSZXBsYXkoe2J1ZmZlclNpemU6IDEsIHJlZkNvdW50OiB0cnVlfSlcbiAgICApO1xuXG4gIG5nQWZ0ZXJWaWV3SW5pdCgpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5jYW52YXMgPT09IG51bGwpIHJldHVybjtcbiAgICB0aGlzLnNpbXBsZVNrZXRjaENhbnZhc1N0b3JlLmluaXQoW1xuICAgICAgdGhpcy5jYW52YXMubmF0aXZlRWxlbWVudCxcbiAgICAgIHRoaXMuYmFja2dyb3VuZENvbG9yLFxuICAgICAgdGhpcy5wYWludENvbG9yLFxuICAgIF0pO1xuICB9XG5cbiAgY2hhbmdlQmFja2dyb3VuZENvbG9yKGV2ZW50OiBFdmVudCkge1xuICAgIHRoaXMuc2ltcGxlU2tldGNoQ2FudmFzU3RvcmUudXBkYXRlQmFja0dyb3VuZENvbG9yKFxuICAgICAgKGV2ZW50LnRhcmdldCBhcyBIVE1MSW5wdXRFbGVtZW50KS52YWx1ZVxuICAgICk7XG4gIH1cblxuICBjaGFuZ2VQYWludENvbG9yKGV2ZW50OiBFdmVudCkge1xuICAgIHRoaXMuc2ltcGxlU2tldGNoQ2FudmFzU3RvcmUudXBkYXRlUGFpbnRDb2xvcihcbiAgICAgIChldmVudC50YXJnZXQgYXMgSFRNTElucHV0RWxlbWVudCkudmFsdWVcbiAgICApO1xuICB9XG5cbiAgc2tldGNoKGV2ZW50OiBNb3VzZUV2ZW50IHwgVG91Y2hFdmVudCkge1xuICAgIHRoaXMuc2ltcGxlU2tldGNoQ2FudmFzU3RvcmUuc2tldGNoKGV2ZW50KTtcbiAgfVxuXG4gIHN0YXJ0U2tldGNoKGV2ZW50OiBNb3VzZUV2ZW50IHwgVG91Y2hFdmVudCkge1xuICAgIHRoaXMuc2ltcGxlU2tldGNoQ2FudmFzU3RvcmUuc3RhcnRTa2V0Y2goZXZlbnQpO1xuICB9XG5cbiAgc3RvcFNrZXRjaChldmVudDogTW91c2VFdmVudCB8IFRvdWNoRXZlbnQpIHtcbiAgICB0aGlzLnNpbXBsZVNrZXRjaENhbnZhc1N0b3JlLnN0b3BTa2V0Y2goZXZlbnQpO1xuICB9XG59XG4iLCI8c2ltcGxlLXNrZXRjaC10b29sYmFyICpuZ0lmPVwic2hvd1Rvb2xiYXJcIj48L3NpbXBsZS1za2V0Y2gtdG9vbGJhcj5cbjxzZWN0aW9uIGNsYXNzPVwiY2FudmFzLXdyYXBwZXJcIj5cbiAgPGNhbnZhcyAjY2FudmFzXG4gICAgICAobW91c2Vkb3duKT1cInN0YXJ0U2tldGNoKCRldmVudClcIlxuICAgICAgKHRvdWNoc3RhcnQpPVwic3RhcnRTa2V0Y2goJGV2ZW50KVwiXG4gICAgICAobW91c2V1cCk9XCJzdG9wU2tldGNoKCRldmVudClcIlxuICAgICAgKHRvdWNoZW5kKT1cInN0b3BTa2V0Y2goJGV2ZW50KVwiXG4gICAgICAobW91c2Vtb3ZlKT1cInNrZXRjaCgkZXZlbnQpXCJcbiAgICAgICh0b3VjaG1vdmUpPVwic2tldGNoKCRldmVudClcIlxuICA+XG4gIDwvY2FudmFzPlxuPC9zZWN0aW9uPlxuXG4iXX0=