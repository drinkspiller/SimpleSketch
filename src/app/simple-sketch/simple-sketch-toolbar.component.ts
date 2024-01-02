import {CommonModule} from '@angular/common';
import {ChangeDetectionStrategy, Component, inject} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {MatToolbarModule} from '@angular/material/toolbar';
import {SimpleSketchStore} from './simple-sketch.store';

@Component({
  selector: 'simple-sketch-toolbar',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatIconModule,
    MatInputModule,
    MatToolbarModule,
  ],
  templateUrl: './simple-sketch-toolbar.component.html',
  styleUrl: './simple-sketch-toolbar.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SimpleSketchToolbarComponent {
  private readonly simpleSketchStore: SimpleSketchStore =
    inject(SimpleSketchStore);
  protected readonly backgroundColor$ = this.simpleSketchStore.backgroundColor$;
  protected readonly paintColor$ = this.simpleSketchStore.paintColor$;

  changeBackgroundColor(event: Event) {
    const newColor = (event.target as HTMLInputElement).value;
    this.simpleSketchStore.updateBackGroundColor(newColor);
  }

  changePaintColor(event: Event) {
    const newColor = (event.target as HTMLInputElement).value;
    this.simpleSketchStore.updatePaintColor(newColor);
  }
}
