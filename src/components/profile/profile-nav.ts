import { Component, Input } from '@angular/core'
import { NavController } from 'ionic-angular'

@Component({
	selector: 'profile-nav',
	templateUrl: 'profile-nav.html'
})
export class ProfileNavComponent {
	@Input() navs

	constructor (private navCtrl: NavController) {}

	handleNavClick (item) {
    item.enabled && this.navCtrl.push(item.page)
  }
}
