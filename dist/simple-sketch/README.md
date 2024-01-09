# SimpleSketch

A standalone Angular component for simple canvas sketching using the [Angular Material](https://material.angular.io/) library. Try [the demo](https://drinkspiller.github.io/SimpleSketch/demo/browser/).

## Prerequisites

[Node and npm](https://nodejs.org/en)

## Installation and Usage

1. Install:

```sh
npm install simple-sketch
```

2. Import into your component's .ts file:

```typescript
/* ----------------------------------------------------------
 * my-component.ts
 * ----------------------------------------------------------*/
import {Component} from '@angular/core';
import {SimpleSketchCanvasComponent} from 'simple-sketch';

@Component({
  selector: 'app-my-component',
  templateUrl: 'my-component.html',
})
export class MyComponent {}
```

3. Import SimpleSketch's styles into your global stylesheet: (e.g. `styles.scss`)

```scss
/* ----------------------------------------------------------
 * styles.scss
 * ----------------------------------------------------------*/
@import '../node_modules/simple-sketch/assets/styles.css';
```

4. Use the simple sketch component in your component's template:

```html
<!----------------------------------------------------------
 * my-component.html
 * ---------------------------------------------------------->
<simple-sketch-canvas
  backgroundColor="#000000"
  paintColor="#ffffff"
  [showToolbar]="true"
>
</simple-sketch-canvas>
```

## Run the Demo App

Run `ng serve`, then navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

<!-- ## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities. -->
