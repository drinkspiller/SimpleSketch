import {AfterViewInit, Component, ElementRef, InjectionToken, Input, ViewChild, inject} from '@angular/core';
import {NgSimpleSketchStore} from './ng-simple-sketch.store';
import {combineLatest, fromEvent, take, tap} from 'rxjs';

@Component({
  selector: 'ng-simple-sketch',
  standalone: true,
  imports: [],
  providers: [NgSimpleSketchStore],
  templateUrl: './ng-simple-sketch.component.html',
  styleUrl: './ng-simple-sketch.component.scss',
})
export class NgSimpleSketchComponent implements AfterViewInit{

  @Input() height: string = '100%';
  @Input() width: string = '100%';
  @Input() toolbar: boolean = true;

  @ViewChild('canvas') canvas:ElementRef<HTMLCanvasElement> | null = null;

  private context: CanvasRenderingContext2D|null = null;
  private readonly store: NgSimpleSketchStore = inject(NgSimpleSketchStore);

  ngAfterViewInit(): void {
    if (this.canvas === null) return;
    this.context = this.canvas.nativeElement.getContext('2d');
    this.store.init([this.canvas.nativeElement, this.width, this.height]);
    this.configureEventListeners(this.canvas.nativeElement);
  }

  configureEventListeners(canvas: HTMLCanvasElement) {
    fromEvent(canvas, 'mousedown')
      .pipe(tap(event => {
        debugger;
      }));
    // canvas.addEventListener('mousedown', (e) => {
    //     isPainting = true;
    //     startX = e.clientX;
    //     startY = e.clientY;
    // });

    // canvas.addEventListener('mouseup', e => {
    //     isPainting = false;
    //     ctx.stroke();
    //     ctx.beginPath();
    // });

    // canvas.addEventListener('mousemove', draw);
  }


  draw(event: MouseEvent) {
    combineLatest([
      this.store.isPainting$,
      this.store.lineWidth$,
      this.store.canvasOffsetX$,
    ]).pipe(
        take(1),
      ).subscribe(([isPainting, lineWidth, canvasOffsetX])=>{
      if(!isPainting || this.context === null) return;

      this.context.lineWidth = lineWidth;
      this.context.lineCap = 'round';

      this.context.lineTo(event.clientX - canvasOffsetX, event.clientY);
      this.context.stroke();
    });
}
}
