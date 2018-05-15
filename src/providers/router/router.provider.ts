import { Injectable } from '@angular/core'
import {
	App,
	NavController,
	NavOptions,
	ViewController
} from 'ionic-angular'
import {
	Page,
	TransitionDoneFn
} from 'ionic-angular/navigation/nav-util'

@Injectable()
export class RouterProvider {
	get navController () {
		return this.app.getActiveNav()
	}

	constructor (private app: App) {}

	setRoot(pageOrViewCtrl: Page | string | ViewController, params?: any, opts?: NavOptions, done?: TransitionDoneFn): Promise<any> {
		return this.navController.setRoot(pageOrViewCtrl, params, opts, done)
	}

	push(page: Page | string, params?: any, opts?: NavOptions, done?: TransitionDoneFn): Promise<any> {
		return this.navController.push(page, params, opts, done)
	}
}