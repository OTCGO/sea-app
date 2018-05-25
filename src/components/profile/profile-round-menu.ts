import { Component, Input } from '@angular/core'
import { NavController } from 'ionic-angular'

interface menu {
	img: string
	page: string
	enabled?: boolean
}

@Component({
	selector: 'profile-round-menu',
	template: `
	  <ion-card class="card-circle-menu">
		  <div *ngFor="let menu of menus"
		       class="card-circle-menu__icon"
		       [class.unavailable]="!menu.enabled"
		       (click)="menu.enabled && navCtrl.push(menu.page)">
			  <img [src]="'assets/imgs/icon-profile_' + menu.icon + '.svg'">
		  </div>
	  </ion-card>
	`
})
export class ProfileRoundMenuComponent {
	@Input()
	get menus() {return this._menus}
	set menus(items: Array<menu>) {
		this._menus = items.map(item => {
			if (typeof item.enabled === 'undefined')
				item.enabled = true
			return item
		})
	}
	private _menus: Array<menu>

	constructor (private navCtrl: NavController) {}
}
