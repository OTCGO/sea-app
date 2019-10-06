import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';

/**
 * Generated class for the SuccessAlertComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'success-alert',
  templateUrl: 'success-alert.html'
})
export class SuccessAlertComponent {



  private display = true;

  public icon
  public title
  public result
  public reason
  public isHome
  constructor(public navCtrl: NavController) {

  }

  btnConfirm() {
    if (this.isHome) {
      this.navCtrl.popToRoot()
      return
    }
    this.display = false
  }

}
