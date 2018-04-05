import { Component } from '@angular/core'
import {
	IonicPage,
	NavController,
	NavParams
} from 'ionic-angular'
import { AccountProvider } from '../../providers/account/account.provider'


@IonicPage({
	name: 'Profile',
	segment: 'profile'
})
@Component({
	selector: 'page-profile',
	templateUrl: 'profile.html',
})
export class ProfilePage {
	account = this.accountProvider.defaultAccount
	avatar = 'assets/imgs/icon-avatar.svg'

	menus = [
		{ icon: 'notification', page: 'Notification', enabled: false },
		{ icon: 'setting', page: 'Settings' },
		{ icon: 'helpcentre', page: 'Helpcentre', enabled: false }
	]

	navs = [
		{
			icon: 'manage-wallet',
			page: 'ManageWallet',
			translation: 'manage_wallet',
			enabled: true,
		},
		{
			icon: 'contacts',
			page: 'Contacts',
			translation: 'contacts',
			enabled: true,
		},
		{
			icon: 'tx-history',
			page: 'Histories',
			translation: 'histories',
			enabled: true,
		}
	]


	constructor (
		public navCtrl: NavController,
		public navParams: NavParams,
		private accountProvider: AccountProvider
	) { }

	handleImageError (event) {
		this.avatar = ''
	}
}
