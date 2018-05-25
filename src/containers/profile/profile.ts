import { Component } from '@angular/core'
import { Store } from '@ngrx/store'
import {
	IonicPage,
	NavController,
	NavParams
} from 'ionic-angular'
import { RootState } from '../../store/reducers'
import { WalletSelectors } from '../../store/selectors'


@IonicPage({
	name: 'Profile',
	segment: 'profile'
})
@Component({
	selector: 'page-profile',
	templateUrl: 'profile.html',
})
export class ProfilePage {
	account
	avatar = 'assets/imgs/icon-avatar.svg'

	/*menus = [
		{ icon: 'notification', page: 'Notification', enabled: false },
		{ icon: 'setting', page: 'Settings' },
		{ icon: 'helpcentre', page: 'Helpcentre', enabled: false }
	]*/

	navs = [
		{
			icon: 'manage-wallet',
			page: 'ManageWallet',
			translation: 'manage_wallet',
			enabled: true,
      click (navCtrl) { return this.enabled && navCtrl.push(this.page) }
		},
		/*{
			icon: 'contacts',
			page: 'Contacts',
			translation: 'contacts',
			enabled: true,
		},*/
		{
			icon: 'tx-history',
			page: 'Histories',
			translation: 'histories',
			enabled: true,
      click: () => {
        console.log('click on this', this)
			  const alink = document.createElement('a')
        alink.href = `http://state.otcgo.cn/addrinfo.html?address=${this.account.address}`
        alink.target = '_blank'
        alink.click()
      }
		}
	]

	constructor (public navCtrl: NavController, public navParams: NavParams, private store: Store<RootState>) {
		store.select(WalletSelectors.getAccount).take(1).subscribe(account => this.account = account)
	}

	handleImageError = () => this.avatar = ''
}

