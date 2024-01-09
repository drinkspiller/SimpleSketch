import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, HostListener, Input, Output, inject, } from '@angular/core';
import { ColorPickerControl, ColorPickerModule } from '@iplab/ngx-color-picker';
import { take } from 'rxjs';
import { SimpleSketchColorPickerStore } from './color-picker.component.store';
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
    toggleColorPicker() {
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
    colorControl = new ColorPickerControl().setColorPresets(DEFAULT_SWATCHES);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29sb3ItcGlja2VyLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9zaW1wbGUtc2tldGNoL2NvbG9yLXBpY2tlci9jb2xvci1waWNrZXIuY29tcG9uZW50LnRzIiwiLi4vLi4vLi4vLi4vc3JjL3NpbXBsZS1za2V0Y2gvY29sb3ItcGlja2VyL2NvbG9yLXBpY2tlci5jb21wb25lbnQuaHRtbCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUMsWUFBWSxFQUFDLE1BQU0saUJBQWlCLENBQUM7QUFDN0MsT0FBTyxFQUNMLHVCQUF1QixFQUN2QixTQUFTLEVBQ1QsWUFBWSxFQUNaLFlBQVksRUFDWixLQUFLLEVBQ0wsTUFBTSxFQUNOLE1BQU0sR0FDUCxNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBQUMsa0JBQWtCLEVBQUUsaUJBQWlCLEVBQUMsTUFBTSx5QkFBeUIsQ0FBQztBQUM5RSxPQUFPLEVBQUMsSUFBSSxFQUFDLE1BQU0sTUFBTSxDQUFDO0FBQzFCLE9BQU8sRUFBQyw0QkFBNEIsRUFBQyxNQUFNLGdDQUFnQyxDQUFDOzs7O0FBRTVFLE1BQU0sQ0FBQyxNQUFNLGdCQUFnQixHQUFHO0lBQzlCLFNBQVM7SUFDVCxTQUFTO0lBQ1QsU0FBUztJQUNULFNBQVM7SUFDVCxTQUFTO0lBQ1QsU0FBUztJQUNULFNBQVM7SUFDVCxTQUFTO0NBQ1YsQ0FBQztBQVdGLE1BQU0sT0FBTyxnQ0FBZ0M7SUFDM0MsSUFDSSxLQUFLLENBQUMsS0FBYTtRQUNyQixJQUFJLENBQUMsWUFBWSxDQUFDLFlBQVksQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUN4QyxDQUFDO0lBQ0QsSUFBSSxLQUFLO1FBQ1AsT0FBTyxJQUFJLENBQUMsWUFBWSxDQUFDLEtBQUssQ0FBQyxXQUFXLEVBQUUsQ0FBQztJQUMvQyxDQUFDO0lBR00sV0FBVyxHQUF5QixJQUFJLFlBQVksRUFBRSxDQUFDO0lBR3ZELG1CQUFtQixHQUEwQixJQUFJLFlBQVksRUFBRSxDQUFDO0lBR3ZFLGlCQUFpQjtRQUNmLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxTQUFTLENBQUMsRUFBRTtZQUNsRCxJQUFJLENBQUMsU0FBUyxFQUFFO2dCQUNkLElBQUksQ0FBQyw0QkFBNEIsQ0FBQyxXQUFXLEVBQUUsQ0FBQzthQUNqRDtpQkFBTTtnQkFDTCxJQUFJLENBQUMsNEJBQTRCLENBQUMsV0FBVyxFQUFFLENBQUM7YUFDakQ7WUFDRCxJQUFJLENBQUMsNEJBQTRCLENBQUMsZUFBZSxDQUFDLENBQUMsU0FBUyxDQUFDLENBQUM7UUFDaEUsQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDO0lBRWtCLFlBQVksR0FBRyxJQUFJLGtCQUFrQixFQUFFLENBQUMsZUFBZSxDQUN4RSxnQkFBZ0IsQ0FDakIsQ0FBQztJQUVRLDRCQUE0QixHQUFHLE1BQU0sQ0FBQyw0QkFBNEIsQ0FBQyxDQUFDO0lBQ3BFLFVBQVUsR0FBRyxJQUFJLENBQUMsNEJBQTRCLENBQUMsVUFBVSxDQUFDO0lBRXBFLFdBQVc7UUFDVCxJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDbEMsSUFBSSxDQUFDLEtBQUssRUFBRSxDQUFDO0lBQ2YsQ0FBQztJQUVELEtBQUs7UUFDSCxJQUFJLENBQUMsNEJBQTRCLENBQUMsV0FBVyxFQUFFLENBQUM7UUFDaEQsSUFBSSxDQUFDLDRCQUE0QixDQUFDLGVBQWUsQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUMzRCxDQUFDO0lBRUQsWUFBWSxDQUFDLEtBQThCO1FBQ3pDLEtBQUssQ0FBQyxlQUFlLEVBQUUsQ0FBQztRQUN4QixJQUFJLENBQUMsS0FBSyxFQUFFLENBQUM7SUFDZixDQUFDO3VHQS9DVSxnQ0FBZ0M7MkZBQWhDLGdDQUFnQyx5UEFMaEMsQ0FBQyw0QkFBNEIsQ0FBQywwQkM3QjNDLDJLQU1BLHFNRHNCWSxZQUFZLG1GQUFFLGlCQUFpQjs7MkZBTTlCLGdDQUFnQztrQkFUNUMsU0FBUzsrQkFDRSw0QkFBNEIsY0FDMUIsSUFBSSxXQUNQLENBQUMsWUFBWSxFQUFFLGlCQUFpQixDQUFDLGFBQy9CLENBQUMsNEJBQTRCLENBQUMsbUJBR3hCLHVCQUF1QixDQUFDLE1BQU07OEJBSTNDLEtBQUs7c0JBRFIsS0FBSztnQkFTQyxXQUFXO3NCQURqQixNQUFNO2dCQUlBLG1CQUFtQjtzQkFEekIsTUFBTTtnQkFJUCxpQkFBaUI7c0JBRGhCLFlBQVk7dUJBQUMsT0FBTyxFQUFFLENBQUMsUUFBUSxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtDb21tb25Nb2R1bGV9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQge1xuICBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSxcbiAgQ29tcG9uZW50LFxuICBFdmVudEVtaXR0ZXIsXG4gIEhvc3RMaXN0ZW5lcixcbiAgSW5wdXQsXG4gIE91dHB1dCxcbiAgaW5qZWN0LFxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7Q29sb3JQaWNrZXJDb250cm9sLCBDb2xvclBpY2tlck1vZHVsZX0gZnJvbSAnQGlwbGFiL25neC1jb2xvci1waWNrZXInO1xuaW1wb3J0IHt0YWtlfSBmcm9tICdyeGpzJztcbmltcG9ydCB7U2ltcGxlU2tldGNoQ29sb3JQaWNrZXJTdG9yZX0gZnJvbSAnLi9jb2xvci1waWNrZXIuY29tcG9uZW50LnN0b3JlJztcblxuZXhwb3J0IGNvbnN0IERFRkFVTFRfU1dBVENIRVMgPSBbXG4gICcjYjgwMDAwJyxcbiAgJyNkYjNlMDAnLFxuICAnI2ZjY2IwMCcsXG4gICcjMDA4YjAyJyxcbiAgJyMwMDRkY2YnLFxuICAnI2JkYmRiZCcsXG4gICcjZmZmZmZmJyxcbiAgJyMwMDAwMDAnLFxuXTtcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnc2ltcGxlLXNrZXRjaC1jb2xvci1waWNrZXInLFxuICBzdGFuZGFsb25lOiB0cnVlLFxuICBpbXBvcnRzOiBbQ29tbW9uTW9kdWxlLCBDb2xvclBpY2tlck1vZHVsZV0sXG4gIHByb3ZpZGVyczogW1NpbXBsZVNrZXRjaENvbG9yUGlja2VyU3RvcmVdLFxuICB0ZW1wbGF0ZVVybDogJy4vY29sb3ItcGlja2VyLmNvbXBvbmVudC5odG1sJyxcbiAgc3R5bGVVcmw6ICcuL2NvbG9yLXBpY2tlci5jb21wb25lbnQuc2NzcycsXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxufSlcbmV4cG9ydCBjbGFzcyBTaW1wbGVTa2V0Y2hDb2xvclBpY2tlckNvbXBvbmVudCB7XG4gIEBJbnB1dCgpXG4gIHNldCBjb2xvcihjb2xvcjogc3RyaW5nKSB7XG4gICAgdGhpcy5jb2xvckNvbnRyb2wuc2V0VmFsdWVGcm9tKGNvbG9yKTtcbiAgfVxuICBnZXQgY29sb3IoKSB7XG4gICAgcmV0dXJuIHRoaXMuY29sb3JDb250cm9sLnZhbHVlLnRvSGV4U3RyaW5nKCk7XG4gIH1cblxuICBAT3V0cHV0KClcbiAgcHVibGljIGNvbG9yQ2hhbmdlOiBFdmVudEVtaXR0ZXI8c3RyaW5nPiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcblxuICBAT3V0cHV0KClcbiAgcHVibGljIHBpY2tlclZpc2libGVDaGFuZ2U6IEV2ZW50RW1pdHRlcjxib29sZWFuPiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcblxuICBASG9zdExpc3RlbmVyKCdjbGljaycsIFsnJGV2ZW50J10pXG4gIHRvZ2dsZUNvbG9yUGlja2VyKCkge1xuICAgIHRoaXMuaXNWaXNpYmxlJC5waXBlKHRha2UoMSkpLnN1YnNjcmliZShpc1Zpc2libGUgPT4ge1xuICAgICAgaWYgKCFpc1Zpc2libGUpIHtcbiAgICAgICAgdGhpcy5zaW1wbGVTa2V0Y2hDb2xvclBpY2tlclN0b3JlLnNob3dPdmVybGF5KCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLnNpbXBsZVNrZXRjaENvbG9yUGlja2VyU3RvcmUuaGlkZU92ZXJsYXkoKTtcbiAgICAgIH1cbiAgICAgIHRoaXMuc2ltcGxlU2tldGNoQ29sb3JQaWNrZXJTdG9yZS51cGRhdGVJc1Zpc2libGUoIWlzVmlzaWJsZSk7XG4gICAgfSk7XG4gIH1cblxuICBwcm90ZWN0ZWQgcmVhZG9ubHkgY29sb3JDb250cm9sID0gbmV3IENvbG9yUGlja2VyQ29udHJvbCgpLnNldENvbG9yUHJlc2V0cyhcbiAgICBERUZBVUxUX1NXQVRDSEVTXG4gICk7XG5cbiAgcHJvdGVjdGVkIHNpbXBsZVNrZXRjaENvbG9yUGlja2VyU3RvcmUgPSBpbmplY3QoU2ltcGxlU2tldGNoQ29sb3JQaWNrZXJTdG9yZSk7XG4gIHByb3RlY3RlZCBpc1Zpc2libGUkID0gdGhpcy5zaW1wbGVTa2V0Y2hDb2xvclBpY2tlclN0b3JlLmlzVmlzaWJsZSQ7XG5cbiAgY2hhbmdlQ29sb3IoKTogdm9pZCB7XG4gICAgdGhpcy5jb2xvckNoYW5nZS5lbWl0KHRoaXMuY29sb3IpO1xuICAgIHRoaXMuY2xvc2UoKTtcbiAgfVxuXG4gIGNsb3NlKCkge1xuICAgIHRoaXMuc2ltcGxlU2tldGNoQ29sb3JQaWNrZXJTdG9yZS5oaWRlT3ZlcmxheSgpO1xuICAgIHRoaXMuc2ltcGxlU2tldGNoQ29sb3JQaWNrZXJTdG9yZS51cGRhdGVJc1Zpc2libGUoZmFsc2UpO1xuICB9XG5cbiAgZGlzY2FyZENsaWNrKGV2ZW50OiBNb3VzZUV2ZW50IHwgVG91Y2hFdmVudCk6IHZvaWQge1xuICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuICAgIHRoaXMuY2xvc2UoKTtcbiAgfVxufVxuIiwiQGlmIChpc1Zpc2libGUkIHwgYXN5bmMpIHtcbiAgPGRpdiBjbGFzcz1cInBpY2tlclwiPlxuICAgIDxnaXRodWItcGlja2VyIFtjb250cm9sXT1cImNvbG9yQ29udHJvbFwiIChjb2xvckNoYW5nZSk9XCJjaGFuZ2VDb2xvcigpXCI+XG4gICAgPC9naXRodWItcGlja2VyPlxuICA8L2Rpdj5cbn1cbiJdfQ==