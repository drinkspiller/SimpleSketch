import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, HostListener, Input, Output, inject, } from '@angular/core';
import { ColorPickerControl, ColorPickerModule } from '@iplab/ngx-color-picker';
import { take } from 'rxjs';
import { SimpleSketchColorPickerStore } from './color-picker.store';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
import * as i2 from "@iplab/ngx-color-picker";
export const DEFAULT_SWATCHES = [
    '#b80000',
    '#db3e00',
    '#fccb00',
    '#008b02',
    '#004dcf',
    '#bdbdbd',
    '#ffffff',
    '#000000',
];
export class SimpleSketchColorPickerComponent {
    set color(color) {
        this.colorControl.setValueFrom(color);
    }
    get color() {
        return this.colorControl.value.toHexString();
    }
    colorChange = new EventEmitter();
    pickerVisibleChange = new EventEmitter();
    toggleColorPicker(event) {
        this.isVisible$.pipe(take(1)).subscribe(isVisible => {
            if (!isVisible) {
                this.simpleSketchColorPickerStore.showOverlay();
            }
            else {
                this.simpleSketchColorPickerStore.hideOverlay();
            }
            this.simpleSketchColorPickerStore.updateIsVisible(!isVisible);
        });
    }
    colorControl = new ColorPickerControl()
        .setValueFrom('#ffffff')
        .setColorPresets(DEFAULT_SWATCHES);
    simpleSketchColorPickerStore = inject(SimpleSketchColorPickerStore);
    isVisible$ = this.simpleSketchColorPickerStore.isVisible$;
    changeColor() {
        this.colorChange.emit(this.color);
        this.close();
    }
    close() {
        this.simpleSketchColorPickerStore.hideOverlay();
        this.simpleSketchColorPickerStore.updateIsVisible(false);
    }
    discardClick(event) {
        event.stopPropagation();
        this.close();
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "17.0.8", ngImport: i0, type: SimpleSketchColorPickerComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "17.0.8", type: SimpleSketchColorPickerComponent, isStandalone: true, selector: "simple-sketch-color-picker", inputs: { color: "color" }, outputs: { colorChange: "colorChange", pickerVisibleChange: "pickerVisibleChange" }, host: { listeners: { "click": "toggleColorPicker($event)" } }, providers: [SimpleSketchColorPickerStore], ngImport: i0, template: "@if (isVisible$ | async) {\n  <div class=\"picker\">\n    <github-picker [control]=\"colorControl\" (colorChange)=\"changeColor()\">\n    </github-picker>\n  </div>\n}\n", styles: [":host{display:block;height:100%;left:0;position:absolute;top:0;width:100%;z-index:10}github-picker{position:absolute;top:100%;z-index:150}\n"], dependencies: [{ kind: "ngmodule", type: CommonModule }, { kind: "pipe", type: i1.AsyncPipe, name: "async" }, { kind: "ngmodule", type: ColorPickerModule }, { kind: "component", type: i2.GithubPickerComponent, selector: "github-picker", inputs: ["color", "control", "columns"], outputs: ["colorChange"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "17.0.8", ngImport: i0, type: SimpleSketchColorPickerComponent, decorators: [{
            type: Component,
            args: [{ selector: 'simple-sketch-color-picker', standalone: true, imports: [CommonModule, ColorPickerModule], providers: [SimpleSketchColorPickerStore], changeDetection: ChangeDetectionStrategy.OnPush, template: "@if (isVisible$ | async) {\n  <div class=\"picker\">\n    <github-picker [control]=\"colorControl\" (colorChange)=\"changeColor()\">\n    </github-picker>\n  </div>\n}\n", styles: [":host{display:block;height:100%;left:0;position:absolute;top:0;width:100%;z-index:10}github-picker{position:absolute;top:100%;z-index:150}\n"] }]
        }], propDecorators: { color: [{
                type: Input
            }], colorChange: [{
                type: Output
            }], pickerVisibleChange: [{
                type: Output
            }], toggleColorPicker: [{
                type: HostListener,
                args: ['click', ['$event']]
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29sb3ItcGlja2VyLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9zaW1wbGUtc2tldGNoL2NvbG9yLXBpY2tlci9jb2xvci1waWNrZXIuY29tcG9uZW50LnRzIiwiLi4vLi4vLi4vLi4vc3JjL3NpbXBsZS1za2V0Y2gvY29sb3ItcGlja2VyL2NvbG9yLXBpY2tlci5jb21wb25lbnQuaHRtbCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUMsWUFBWSxFQUFDLE1BQU0saUJBQWlCLENBQUM7QUFDN0MsT0FBTyxFQUNMLHVCQUF1QixFQUN2QixTQUFTLEVBQ1QsWUFBWSxFQUNaLFlBQVksRUFDWixLQUFLLEVBQ0wsTUFBTSxFQUNOLE1BQU0sR0FDUCxNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBQUMsa0JBQWtCLEVBQUUsaUJBQWlCLEVBQUMsTUFBTSx5QkFBeUIsQ0FBQztBQUM5RSxPQUFPLEVBQUMsSUFBSSxFQUFDLE1BQU0sTUFBTSxDQUFDO0FBQzFCLE9BQU8sRUFBQyw0QkFBNEIsRUFBQyxNQUFNLHNCQUFzQixDQUFDOzs7O0FBRWxFLE1BQU0sQ0FBQyxNQUFNLGdCQUFnQixHQUFHO0lBQzlCLFNBQVM7SUFDVCxTQUFTO0lBQ1QsU0FBUztJQUNULFNBQVM7SUFDVCxTQUFTO0lBQ1QsU0FBUztJQUNULFNBQVM7SUFDVCxTQUFTO0NBQ1YsQ0FBQztBQVdGLE1BQU0sT0FBTyxnQ0FBZ0M7SUFDM0MsSUFDSSxLQUFLLENBQUMsS0FBYTtRQUNyQixJQUFJLENBQUMsWUFBWSxDQUFDLFlBQVksQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUN4QyxDQUFDO0lBQ0QsSUFBSSxLQUFLO1FBQ1AsT0FBTyxJQUFJLENBQUMsWUFBWSxDQUFDLEtBQUssQ0FBQyxXQUFXLEVBQUUsQ0FBQztJQUMvQyxDQUFDO0lBR00sV0FBVyxHQUF5QixJQUFJLFlBQVksRUFBRSxDQUFDO0lBR3ZELG1CQUFtQixHQUEwQixJQUFJLFlBQVksRUFBRSxDQUFDO0lBR3ZFLGlCQUFpQixDQUFDLEtBQVk7UUFDNUIsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDLFNBQVMsQ0FBQyxFQUFFO1lBQ2xELElBQUksQ0FBQyxTQUFTLEVBQUU7Z0JBQ2QsSUFBSSxDQUFDLDRCQUE0QixDQUFDLFdBQVcsRUFBRSxDQUFDO2FBQ2pEO2lCQUFNO2dCQUNMLElBQUksQ0FBQyw0QkFBNEIsQ0FBQyxXQUFXLEVBQUUsQ0FBQzthQUNqRDtZQUNELElBQUksQ0FBQyw0QkFBNEIsQ0FBQyxlQUFlLENBQUMsQ0FBQyxTQUFTLENBQUMsQ0FBQztRQUNoRSxDQUFDLENBQUMsQ0FBQztJQUNMLENBQUM7SUFFa0IsWUFBWSxHQUFHLElBQUksa0JBQWtCLEVBQUU7U0FDdkQsWUFBWSxDQUFDLFNBQVMsQ0FBQztTQUN2QixlQUFlLENBQUMsZ0JBQWdCLENBQUMsQ0FBQztJQUUzQiw0QkFBNEIsR0FBRyxNQUFNLENBQUMsNEJBQTRCLENBQUMsQ0FBQztJQUNwRSxVQUFVLEdBQUcsSUFBSSxDQUFDLDRCQUE0QixDQUFDLFVBQVUsQ0FBQztJQUVwRSxXQUFXO1FBQ1QsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQ2xDLElBQUksQ0FBQyxLQUFLLEVBQUUsQ0FBQztJQUNmLENBQUM7SUFFRCxLQUFLO1FBQ0gsSUFBSSxDQUFDLDRCQUE0QixDQUFDLFdBQVcsRUFBRSxDQUFDO1FBQ2hELElBQUksQ0FBQyw0QkFBNEIsQ0FBQyxlQUFlLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDM0QsQ0FBQztJQUVELFlBQVksQ0FBQyxLQUE4QjtRQUN6QyxLQUFLLENBQUMsZUFBZSxFQUFFLENBQUM7UUFDeEIsSUFBSSxDQUFDLEtBQUssRUFBRSxDQUFDO0lBQ2YsQ0FBQzt1R0EvQ1UsZ0NBQWdDOzJGQUFoQyxnQ0FBZ0MseVBBTGhDLENBQUMsNEJBQTRCLENBQUMsMEJDN0IzQywyS0FNQSxxTURzQlksWUFBWSxtRkFBRSxpQkFBaUI7OzJGQU05QixnQ0FBZ0M7a0JBVDVDLFNBQVM7K0JBQ0UsNEJBQTRCLGNBQzFCLElBQUksV0FDUCxDQUFDLFlBQVksRUFBRSxpQkFBaUIsQ0FBQyxhQUMvQixDQUFDLDRCQUE0QixDQUFDLG1CQUd4Qix1QkFBdUIsQ0FBQyxNQUFNOzhCQUkzQyxLQUFLO3NCQURSLEtBQUs7Z0JBU0MsV0FBVztzQkFEakIsTUFBTTtnQkFJQSxtQkFBbUI7c0JBRHpCLE1BQU07Z0JBSVAsaUJBQWlCO3NCQURoQixZQUFZO3VCQUFDLE9BQU8sRUFBRSxDQUFDLFFBQVEsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7Q29tbW9uTW9kdWxlfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHtcbiAgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksXG4gIENvbXBvbmVudCxcbiAgRXZlbnRFbWl0dGVyLFxuICBIb3N0TGlzdGVuZXIsXG4gIElucHV0LFxuICBPdXRwdXQsXG4gIGluamVjdCxcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge0NvbG9yUGlja2VyQ29udHJvbCwgQ29sb3JQaWNrZXJNb2R1bGV9IGZyb20gJ0BpcGxhYi9uZ3gtY29sb3ItcGlja2VyJztcbmltcG9ydCB7dGFrZX0gZnJvbSAncnhqcyc7XG5pbXBvcnQge1NpbXBsZVNrZXRjaENvbG9yUGlja2VyU3RvcmV9IGZyb20gJy4vY29sb3ItcGlja2VyLnN0b3JlJztcblxuZXhwb3J0IGNvbnN0IERFRkFVTFRfU1dBVENIRVMgPSBbXG4gICcjYjgwMDAwJyxcbiAgJyNkYjNlMDAnLFxuICAnI2ZjY2IwMCcsXG4gICcjMDA4YjAyJyxcbiAgJyMwMDRkY2YnLFxuICAnI2JkYmRiZCcsXG4gICcjZmZmZmZmJyxcbiAgJyMwMDAwMDAnLFxuXTtcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnc2ltcGxlLXNrZXRjaC1jb2xvci1waWNrZXInLFxuICBzdGFuZGFsb25lOiB0cnVlLFxuICBpbXBvcnRzOiBbQ29tbW9uTW9kdWxlLCBDb2xvclBpY2tlck1vZHVsZV0sXG4gIHByb3ZpZGVyczogW1NpbXBsZVNrZXRjaENvbG9yUGlja2VyU3RvcmVdLFxuICB0ZW1wbGF0ZVVybDogJy4vY29sb3ItcGlja2VyLmNvbXBvbmVudC5odG1sJyxcbiAgc3R5bGVVcmw6ICcuL2NvbG9yLXBpY2tlci5jb21wb25lbnQuc2NzcycsXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxufSlcbmV4cG9ydCBjbGFzcyBTaW1wbGVTa2V0Y2hDb2xvclBpY2tlckNvbXBvbmVudCB7XG4gIEBJbnB1dCgpXG4gIHNldCBjb2xvcihjb2xvcjogc3RyaW5nKSB7XG4gICAgdGhpcy5jb2xvckNvbnRyb2wuc2V0VmFsdWVGcm9tKGNvbG9yKTtcbiAgfVxuICBnZXQgY29sb3IoKSB7XG4gICAgcmV0dXJuIHRoaXMuY29sb3JDb250cm9sLnZhbHVlLnRvSGV4U3RyaW5nKCk7XG4gIH1cblxuICBAT3V0cHV0KClcbiAgcHVibGljIGNvbG9yQ2hhbmdlOiBFdmVudEVtaXR0ZXI8c3RyaW5nPiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcblxuICBAT3V0cHV0KClcbiAgcHVibGljIHBpY2tlclZpc2libGVDaGFuZ2U6IEV2ZW50RW1pdHRlcjxib29sZWFuPiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcblxuICBASG9zdExpc3RlbmVyKCdjbGljaycsIFsnJGV2ZW50J10pXG4gIHRvZ2dsZUNvbG9yUGlja2VyKGV2ZW50OiBFdmVudCkge1xuICAgIHRoaXMuaXNWaXNpYmxlJC5waXBlKHRha2UoMSkpLnN1YnNjcmliZShpc1Zpc2libGUgPT4ge1xuICAgICAgaWYgKCFpc1Zpc2libGUpIHtcbiAgICAgICAgdGhpcy5zaW1wbGVTa2V0Y2hDb2xvclBpY2tlclN0b3JlLnNob3dPdmVybGF5KCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLnNpbXBsZVNrZXRjaENvbG9yUGlja2VyU3RvcmUuaGlkZU92ZXJsYXkoKTtcbiAgICAgIH1cbiAgICAgIHRoaXMuc2ltcGxlU2tldGNoQ29sb3JQaWNrZXJTdG9yZS51cGRhdGVJc1Zpc2libGUoIWlzVmlzaWJsZSk7XG4gICAgfSk7XG4gIH1cblxuICBwcm90ZWN0ZWQgcmVhZG9ubHkgY29sb3JDb250cm9sID0gbmV3IENvbG9yUGlja2VyQ29udHJvbCgpXG4gICAgLnNldFZhbHVlRnJvbSgnI2ZmZmZmZicpXG4gICAgLnNldENvbG9yUHJlc2V0cyhERUZBVUxUX1NXQVRDSEVTKTtcblxuICBwcm90ZWN0ZWQgc2ltcGxlU2tldGNoQ29sb3JQaWNrZXJTdG9yZSA9IGluamVjdChTaW1wbGVTa2V0Y2hDb2xvclBpY2tlclN0b3JlKTtcbiAgcHJvdGVjdGVkIGlzVmlzaWJsZSQgPSB0aGlzLnNpbXBsZVNrZXRjaENvbG9yUGlja2VyU3RvcmUuaXNWaXNpYmxlJDtcblxuICBjaGFuZ2VDb2xvcigpOiB2b2lkIHtcbiAgICB0aGlzLmNvbG9yQ2hhbmdlLmVtaXQodGhpcy5jb2xvcik7XG4gICAgdGhpcy5jbG9zZSgpO1xuICB9XG5cbiAgY2xvc2UoKSB7XG4gICAgdGhpcy5zaW1wbGVTa2V0Y2hDb2xvclBpY2tlclN0b3JlLmhpZGVPdmVybGF5KCk7XG4gICAgdGhpcy5zaW1wbGVTa2V0Y2hDb2xvclBpY2tlclN0b3JlLnVwZGF0ZUlzVmlzaWJsZShmYWxzZSk7XG4gIH1cblxuICBkaXNjYXJkQ2xpY2soZXZlbnQ6IE1vdXNlRXZlbnQgfCBUb3VjaEV2ZW50KTogdm9pZCB7XG4gICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgdGhpcy5jbG9zZSgpO1xuICB9XG59XG4iLCJAaWYgKGlzVmlzaWJsZSQgfCBhc3luYykge1xuICA8ZGl2IGNsYXNzPVwicGlja2VyXCI+XG4gICAgPGdpdGh1Yi1waWNrZXIgW2NvbnRyb2xdPVwiY29sb3JDb250cm9sXCIgKGNvbG9yQ2hhbmdlKT1cImNoYW5nZUNvbG9yKClcIj5cbiAgICA8L2dpdGh1Yi1waWNrZXI+XG4gIDwvZGl2PlxufVxuIl19