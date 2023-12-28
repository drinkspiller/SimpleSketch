import {CommonModule} from '@angular/common';
import {Component} from '@angular/core';
import {NgSimpleSketchComponent} from './simple-sketch/ng-simple-sketch.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, NgSimpleSketchComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {}
