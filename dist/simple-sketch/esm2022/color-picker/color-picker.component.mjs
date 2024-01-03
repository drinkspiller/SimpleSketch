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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29sb3ItcGlja2VyLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9zaW1wbGUtc2tldGNoL2NvbG9yLXBpY2tlci9jb2xvci1waWNrZXIuY29tcG9uZW50LnRzIiwiLi4vLi4vLi4vLi4vc3JjL3NpbXBsZS1za2V0Y2gvY29sb3ItcGlja2VyL2NvbG9yLXBpY2tlci5jb21wb25lbnQuaHRtbCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUMsWUFBWSxFQUFDLE1BQU0saUJBQWlCLENBQUM7QUFDN0MsT0FBTyxFQUNMLHVCQUF1QixFQUN2QixTQUFTLEVBQ1QsWUFBWSxFQUNaLFlBQVksRUFDWixLQUFLLEVBQ0wsTUFBTSxFQUNOLE1BQU0sR0FDUCxNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBQUMsa0JBQWtCLEVBQUUsaUJBQWlCLEVBQUMsTUFBTSx5QkFBeUIsQ0FBQztBQUM5RSxPQUFPLEVBQUMsSUFBSSxFQUFDLE1BQU0sTUFBTSxDQUFDO0FBQzFCLE9BQU8sRUFBQyw0QkFBNEIsRUFBQyxNQUFNLHNCQUFzQixDQUFDOzs7O0FBRWxFLE1BQU0sQ0FBQyxNQUFNLGdCQUFnQixHQUFHO0lBQzlCLFNBQVM7SUFDVCxTQUFTO0lBQ1QsU0FBUztJQUNULFNBQVM7SUFDVCxTQUFTO0lBQ1QsU0FBUztJQUNULFNBQVM7SUFDVCxTQUFTO0NBQ1YsQ0FBQztBQVdGLE1BQU0sT0FBTyxnQ0FBZ0M7SUFDM0MsSUFDSSxLQUFLLENBQUMsS0FBYTtRQUNyQixJQUFJLENBQUMsWUFBWSxDQUFDLFlBQVksQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUN4QyxDQUFDO0lBQ0QsSUFBSSxLQUFLO1FBQ1AsT0FBTyxJQUFJLENBQUMsWUFBWSxDQUFDLEtBQUssQ0FBQyxXQUFXLEVBQUUsQ0FBQztJQUMvQyxDQUFDO0lBR00sV0FBVyxHQUF5QixJQUFJLFlBQVksRUFBRSxDQUFDO0lBR3ZELG1CQUFtQixHQUEwQixJQUFJLFlBQVksRUFBRSxDQUFDO0lBR3ZFLGlCQUFpQjtRQUNmLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxTQUFTLENBQUMsRUFBRTtZQUNsRCxJQUFJLENBQUMsU0FBUyxFQUFFO2dCQUNkLElBQUksQ0FBQyw0QkFBNEIsQ0FBQyxXQUFXLEVBQUUsQ0FBQzthQUNqRDtpQkFBTTtnQkFDTCxJQUFJLENBQUMsNEJBQTRCLENBQUMsV0FBVyxFQUFFLENBQUM7YUFDakQ7WUFDRCxJQUFJLENBQUMsNEJBQTRCLENBQUMsZUFBZSxDQUFDLENBQUMsU0FBUyxDQUFDLENBQUM7UUFDaEUsQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDO0lBRWtCLFlBQVksR0FBRyxJQUFJLGtCQUFrQixFQUFFO1NBQ3ZELFlBQVksQ0FBQyxTQUFTLENBQUM7U0FDdkIsZUFBZSxDQUFDLGdCQUFnQixDQUFDLENBQUM7SUFFM0IsNEJBQTRCLEdBQUcsTUFBTSxDQUFDLDRCQUE0QixDQUFDLENBQUM7SUFDcEUsVUFBVSxHQUFHLElBQUksQ0FBQyw0QkFBNEIsQ0FBQyxVQUFVLENBQUM7SUFFcEUsV0FBVztRQUNULElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUNsQyxJQUFJLENBQUMsS0FBSyxFQUFFLENBQUM7SUFDZixDQUFDO0lBRUQsS0FBSztRQUNILElBQUksQ0FBQyw0QkFBNEIsQ0FBQyxXQUFXLEVBQUUsQ0FBQztRQUNoRCxJQUFJLENBQUMsNEJBQTRCLENBQUMsZUFBZSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQzNELENBQUM7SUFFRCxZQUFZLENBQUMsS0FBOEI7UUFDekMsS0FBSyxDQUFDLGVBQWUsRUFBRSxDQUFDO1FBQ3hCLElBQUksQ0FBQyxLQUFLLEVBQUUsQ0FBQztJQUNmLENBQUM7dUdBL0NVLGdDQUFnQzsyRkFBaEMsZ0NBQWdDLHlQQUxoQyxDQUFDLDRCQUE0QixDQUFDLDBCQzdCM0MsMktBTUEscU1Ec0JZLFlBQVksbUZBQUUsaUJBQWlCOzsyRkFNOUIsZ0NBQWdDO2tCQVQ1QyxTQUFTOytCQUNFLDRCQUE0QixjQUMxQixJQUFJLFdBQ1AsQ0FBQyxZQUFZLEVBQUUsaUJBQWlCLENBQUMsYUFDL0IsQ0FBQyw0QkFBNEIsQ0FBQyxtQkFHeEIsdUJBQXVCLENBQUMsTUFBTTs4QkFJM0MsS0FBSztzQkFEUixLQUFLO2dCQVNDLFdBQVc7c0JBRGpCLE1BQU07Z0JBSUEsbUJBQW1CO3NCQUR6QixNQUFNO2dCQUlQLGlCQUFpQjtzQkFEaEIsWUFBWTt1QkFBQyxPQUFPLEVBQUUsQ0FBQyxRQUFRLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0NvbW1vbk1vZHVsZX0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7XG4gIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LFxuICBDb21wb25lbnQsXG4gIEV2ZW50RW1pdHRlcixcbiAgSG9zdExpc3RlbmVyLFxuICBJbnB1dCxcbiAgT3V0cHV0LFxuICBpbmplY3QsXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtDb2xvclBpY2tlckNvbnRyb2wsIENvbG9yUGlja2VyTW9kdWxlfSBmcm9tICdAaXBsYWIvbmd4LWNvbG9yLXBpY2tlcic7XG5pbXBvcnQge3Rha2V9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHtTaW1wbGVTa2V0Y2hDb2xvclBpY2tlclN0b3JlfSBmcm9tICcuL2NvbG9yLXBpY2tlci5zdG9yZSc7XG5cbmV4cG9ydCBjb25zdCBERUZBVUxUX1NXQVRDSEVTID0gW1xuICAnI2I4MDAwMCcsXG4gICcjZGIzZTAwJyxcbiAgJyNmY2NiMDAnLFxuICAnIzAwOGIwMicsXG4gICcjMDA0ZGNmJyxcbiAgJyNiZGJkYmQnLFxuICAnI2ZmZmZmZicsXG4gICcjMDAwMDAwJyxcbl07XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ3NpbXBsZS1za2V0Y2gtY29sb3ItcGlja2VyJyxcbiAgc3RhbmRhbG9uZTogdHJ1ZSxcbiAgaW1wb3J0czogW0NvbW1vbk1vZHVsZSwgQ29sb3JQaWNrZXJNb2R1bGVdLFxuICBwcm92aWRlcnM6IFtTaW1wbGVTa2V0Y2hDb2xvclBpY2tlclN0b3JlXSxcbiAgdGVtcGxhdGVVcmw6ICcuL2NvbG9yLXBpY2tlci5jb21wb25lbnQuaHRtbCcsXG4gIHN0eWxlVXJsOiAnLi9jb2xvci1waWNrZXIuY29tcG9uZW50LnNjc3MnLFxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcbn0pXG5leHBvcnQgY2xhc3MgU2ltcGxlU2tldGNoQ29sb3JQaWNrZXJDb21wb25lbnQge1xuICBASW5wdXQoKVxuICBzZXQgY29sb3IoY29sb3I6IHN0cmluZykge1xuICAgIHRoaXMuY29sb3JDb250cm9sLnNldFZhbHVlRnJvbShjb2xvcik7XG4gIH1cbiAgZ2V0IGNvbG9yKCkge1xuICAgIHJldHVybiB0aGlzLmNvbG9yQ29udHJvbC52YWx1ZS50b0hleFN0cmluZygpO1xuICB9XG5cbiAgQE91dHB1dCgpXG4gIHB1YmxpYyBjb2xvckNoYW5nZTogRXZlbnRFbWl0dGVyPHN0cmluZz4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG5cbiAgQE91dHB1dCgpXG4gIHB1YmxpYyBwaWNrZXJWaXNpYmxlQ2hhbmdlOiBFdmVudEVtaXR0ZXI8Ym9vbGVhbj4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG5cbiAgQEhvc3RMaXN0ZW5lcignY2xpY2snLCBbJyRldmVudCddKVxuICB0b2dnbGVDb2xvclBpY2tlcigpIHtcbiAgICB0aGlzLmlzVmlzaWJsZSQucGlwZSh0YWtlKDEpKS5zdWJzY3JpYmUoaXNWaXNpYmxlID0+IHtcbiAgICAgIGlmICghaXNWaXNpYmxlKSB7XG4gICAgICAgIHRoaXMuc2ltcGxlU2tldGNoQ29sb3JQaWNrZXJTdG9yZS5zaG93T3ZlcmxheSgpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5zaW1wbGVTa2V0Y2hDb2xvclBpY2tlclN0b3JlLmhpZGVPdmVybGF5KCk7XG4gICAgICB9XG4gICAgICB0aGlzLnNpbXBsZVNrZXRjaENvbG9yUGlja2VyU3RvcmUudXBkYXRlSXNWaXNpYmxlKCFpc1Zpc2libGUpO1xuICAgIH0pO1xuICB9XG5cbiAgcHJvdGVjdGVkIHJlYWRvbmx5IGNvbG9yQ29udHJvbCA9IG5ldyBDb2xvclBpY2tlckNvbnRyb2woKVxuICAgIC5zZXRWYWx1ZUZyb20oJyNmZmZmZmYnKVxuICAgIC5zZXRDb2xvclByZXNldHMoREVGQVVMVF9TV0FUQ0hFUyk7XG5cbiAgcHJvdGVjdGVkIHNpbXBsZVNrZXRjaENvbG9yUGlja2VyU3RvcmUgPSBpbmplY3QoU2ltcGxlU2tldGNoQ29sb3JQaWNrZXJTdG9yZSk7XG4gIHByb3RlY3RlZCBpc1Zpc2libGUkID0gdGhpcy5zaW1wbGVTa2V0Y2hDb2xvclBpY2tlclN0b3JlLmlzVmlzaWJsZSQ7XG5cbiAgY2hhbmdlQ29sb3IoKTogdm9pZCB7XG4gICAgdGhpcy5jb2xvckNoYW5nZS5lbWl0KHRoaXMuY29sb3IpO1xuICAgIHRoaXMuY2xvc2UoKTtcbiAgfVxuXG4gIGNsb3NlKCkge1xuICAgIHRoaXMuc2ltcGxlU2tldGNoQ29sb3JQaWNrZXJTdG9yZS5oaWRlT3ZlcmxheSgpO1xuICAgIHRoaXMuc2ltcGxlU2tldGNoQ29sb3JQaWNrZXJTdG9yZS51cGRhdGVJc1Zpc2libGUoZmFsc2UpO1xuICB9XG5cbiAgZGlzY2FyZENsaWNrKGV2ZW50OiBNb3VzZUV2ZW50IHwgVG91Y2hFdmVudCk6IHZvaWQge1xuICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuICAgIHRoaXMuY2xvc2UoKTtcbiAgfVxufVxuIiwiQGlmIChpc1Zpc2libGUkIHwgYXN5bmMpIHtcbiAgPGRpdiBjbGFzcz1cInBpY2tlclwiPlxuICAgIDxnaXRodWItcGlja2VyIFtjb250cm9sXT1cImNvbG9yQ29udHJvbFwiIChjb2xvckNoYW5nZSk9XCJjaGFuZ2VDb2xvcigpXCI+XG4gICAgPC9naXRodWItcGlja2VyPlxuICA8L2Rpdj5cbn1cbiJdfQ==