import { Component } from '@angular/core';

/**
 * Generated class for the AlertBurnComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'alert-burn',
  templateUrl: 'alert-burn.html'
})
export class AlertBurnComponent {

  text: string;

  constructor() {
    console.log('Hello AlertBurnComponent Component');
    this.text = 'Hello World';
  }

}
