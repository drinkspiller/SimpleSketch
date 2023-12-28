import {
  AfterViewInit,
  Component,
  ElementRef,
  inject,
  Input,
  ViewChild,
} from '@angular/core';
import {combineLatest, fromEvent, map, take, takeUntil, tap} from 'rxjs';

import {NgSimpleSketchStore} from './ng-simple-sketch.store';

@Component({
  selector: 'ng-simple-sketch',
  standalone: true,
  imports: [],
  providers: [NgSimpleSketchStore],
  templateUrl: './ng-simple-sketch.component.html',
  styleUrl: './ng-simple-sketch.component.scss',
})
export class NgSimpleSketchComponent implements AfterViewInit {
  @Input() height = '100%';
  @Input() width = '100%';
  @Input() toolbar = true;

  @ViewChild('canvas') canvas: ElementRef<HTMLCanvasElement> | null = null;

  private context: CanvasRenderingContext2D | null = null;
  private readonly simpleSketchStore: NgSimpleSketchStore =
    inject(NgSimpleSketchStore);

  ngAfterViewInit(): void {
    if (this.canvas === null) return;
    this.context = this.canvas.nativeElement.getContext('2d');
    this.simpleSketchStore.init([
      this.canvas.nativeElement,
      this.width,
      this.height,
    ]);
    this.configureEventListeners(this.canvas.nativeElement);
  }

  configureEventListeners(canvas: HTMLCanvasElement) {
    fromEvent(canvas, 'mousedown')
      .pipe(
        takeUntil(this.simpleSketchStore.destroy$),
        map((event: Event) => event as MouseEvent),
        tap((event: MouseEvent) => {
          this.simpleSketchStore.updateIsPainting(true);
          this.simpleSketchStore.updateStartX(event.clientX);
          this.simpleSketchStore.updateStartY(event.clientY);
        })
      )
      .subscribe();

    fromEvent(canvas, 'mouseup')
      .pipe(
        takeUntil(this.simpleSketchStore.destroy$),
        tap(() => {
          this.simpleSketchStore.updateIsPainting(false);

          if (this.context === null) return;
          this.context.stroke();
          this.context.beginPath();
        })
      )
      .subscribe();

    fromEvent(canvas, 'mousemove')
      .pipe(
        takeUntil(this.simpleSketchStore.destroy$),
        map((event: Event) => event as MouseEvent),
        tap((event: MouseEvent) => {
          this.draw(event);
        })
      )
      .subscribe();
  }

  draw(event: MouseEvent) {
    combineLatest([
      this.simpleSketchStore.isPainting$,
      this.simpleSketchStore.lineWidth$,
      this.simpleSketchStore.canvasOffsetX$,
    ])
      .pipe(take(1))
      .subscribe(([isPainting, lineWidth, canvasOffsetX]) => {
        if (!isPainting || this.context === null) return;

        this.context.lineWidth = lineWidth;
        this.context.lineCap = 'round';

        this.context.lineTo(event.clientX - canvasOffsetX, event.clientY);
        this.context.stroke();
      });
  }
}
