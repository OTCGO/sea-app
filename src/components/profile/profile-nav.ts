import { Component, Input } from '@angular/core'
import { NavController } from 'ionic-angular'
import { InAppBrowser } from '@ionic-native/in-app-browser'

@Component({
	selector: 'profile-nav',
	templateUrl: 'profile-nav.html'
})
export class ProfileNavComponent {
	@Input() navs
	@Input() address

	constructor (private navCtrl: NavController, private iab: InAppBrowser) {}

	handleNavClick (item) {
		// console.log('handleNavClick', this.address)


		if (item.page === 'Histories') {
			this.iab.create(`http://state.otcgo.cn/addrinfo.html?address=${this.address}`, '_system')
			return
		}

		if (item.enabled) {
				this.navCtrl.push(item.page)
		}


  	}
}
