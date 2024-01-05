import {CommonModule} from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  inject,
} from '@angular/core';
import {SimpleSketchCanvasComponent} from '../simple-sketch/canvas/canvas.component';
import {BehaviorSubject, Observable} from 'rxjs';
import {WINDOW} from '../simple-sketch/injection-tokens';
import {PromptInputComponent} from '../prompt-input/prompt-input.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, PromptInputComponent, SimpleSketchCanvasComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent implements OnInit {
  private readonly window: Window = inject(WINDOW);
  private readonly isDebug = new BehaviorSubject<boolean>(false);
  protected readonly isDebug$: Observable<boolean> = this.isDebug;

  ngOnInit() {
    // eslint-disable-next-line node/no-unsupported-features/node-builtins
    const urlParams = new URLSearchParams(this.window.location.search);
    this.isDebug.next(urlParams.get('css-debug') ? true : false);
  }
}
