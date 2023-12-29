import {CommonModule} from '@angular/common';
import {Component} from '@angular/core';
import {SimpleSketchComponent} from './simple-sketch/simple-sketch.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, SimpleSketchComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {}
