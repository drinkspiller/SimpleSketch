import {AfterViewInit, Component, Input, ViewChild} from '@angular/core';

@Component({
  selector: 'ng-simple-sketch',
  standalone: true,
  imports: [],
  templateUrl: './ng-simple-sketch.component.html',
  styleUrl: './ng-simple-sketch.component.scss',
})
export class NgSimpleSketchComponent implements AfterViewInit{

  @Input() height: string = '100%';
  @Input() width: string = '100%';
  @Input() toolbar: boolean = true;

  @ViewChild('canvas') canvas:HTMLCanvasElement | null = null;

  private context: CanvasRenderingContext2D|null = null;

  ngAfterViewInit(): void {
    if (this.canvas === null) return;

    this.canvas.style.width = this.width;
    this.canvas.style.height = this.height;
    this.context = this.canvas.getContext('2d')
  }
}
