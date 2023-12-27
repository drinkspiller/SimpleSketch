import { Injectable } from '@angular/core';
import {ComponentStore} from '@ngrx/component-store';

export interface SimpleSketchState {
  isPainting: boolean;
  lineWidth: number;
  startX: number;
  startY: number;
}

export const INITIAL_STATE:SimpleSketchState = {
  isPainting: false,
  lineWidth: 5,
  startX: 0,
  startY: 0,
}

@Injectable({
  providedIn: 'root'
})
export class NgSimpleSketchStoreService extends ComponentStore<SimpleSketchState>{

  constructor() {
    super(INITIAL_STATE);
  }
}
