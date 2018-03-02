import { Component, Input } from '@angular/core'
import { NavController } from 'ionic-angular'

@Component({
	selector: 'profile-nav',
	templateUrl: 'profile-nav.html'
})
export class ProfileNavComponent {
	@Input() item = {
		icon: 'manage-wallet',
		enabled: false,
		page: 'ManageWallet'
	}

	constructor (private navCtrl: NavController) {}

	navPush (item) {
    item.enabled && this.navCtrl.push(item.page)
  }
}
