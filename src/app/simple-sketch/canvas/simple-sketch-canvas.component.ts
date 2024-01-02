import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  inject,
  Input,
  ViewChild,
} from '@angular/core';

import {SimpleSketchCanvasStore} from './simple-sketch-canvas.store';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {shareReplay} from 'rxjs/operators';
import {SimpleSketchToolbarComponent} from '../toolbar/simple-sketch-toolbar.component';

@Component({
  selector: 'simple-sketch-canvas',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatInputModule,
    SimpleSketchToolbarComponent,
  ],
  providers: [SimpleSketchCanvasStore],
  templateUrl: './simple-sketch-canvas.component.html',
  styleUrl: './simple-sketch-canvas.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SimpleSketchCanvasComponent implements AfterViewInit {
  @Input({required: false}) showToolbar = true;
  @Input({required: false}) backgroundColor = '#ffffff';
  @Input({required: false}) paintColor = '#000000';

  @ViewChild('canvas') canvas: ElementRef<HTMLCanvasElement> | null = null;

  private readonly simpleSketchCanvasStore: SimpleSketchCanvasStore = inject(
    SimpleSketchCanvasStore
  );
  protected readonly backgroundColor$ =
    this.simpleSketchCanvasStore.backgroundColor$.pipe(
      shareReplay({bufferSize: 1, refCount: true})
    );
  protected readonly paintColor$ =
    this.simpleSketchCanvasStore.paintColor$.pipe(
      shareReplay({bufferSize: 1, refCount: true})
    );

  ngAfterViewInit(): void {
    if (this.canvas === null) return;
    this.simpleSketchCanvasStore.init([
      this.canvas.nativeElement,
      this.backgroundColor,
      this.paintColor,
    ]);
  }

  changeBackgroundColor(event: Event) {
    this.simpleSketchCanvasStore.updateBackGroundColor(
      (event.target as HTMLInputElement).value
    );
  }

  changePaintColor(event: Event) {
    this.simpleSketchCanvasStore.updatePaintColor(
      (event.target as HTMLInputElement).value
    );
  }

  sketch(event: MouseEvent | TouchEvent) {
    this.simpleSketchCanvasStore.sketch(event);
  }

  startSketch(event: MouseEvent | TouchEvent) {
    this.simpleSketchCanvasStore.startSketch(event);
  }

  stopSketch(event: MouseEvent | TouchEvent) {
    this.simpleSketchCanvasStore.stopSketch(event);
  }
}
