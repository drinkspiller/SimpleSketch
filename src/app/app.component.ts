import {CommonModule} from '@angular/common';
import {Component} from '@angular/core';
import {SimpleSketchCanvasComponent} from './simple-sketch/canvas/canvas.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, SimpleSketchCanvasComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {}
