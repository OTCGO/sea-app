import { Component, Input } from '@angular/core'

@Component({
	selector: 'profile-nav',
	templateUrl: 'nav.html'
})
export class ProfileNavComponent {
	@Input() item = {
		icon: 'manage-wallet',
		enabled: false,
		page: 'ManageWallet'
	}
}
