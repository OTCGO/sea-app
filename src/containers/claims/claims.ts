import { Component } from '@angular/core'
import { IonicPage } from 'ionic-angular'

import { Store, select } from '@ngrx/store'

import { ClaimsProvider } from './claims.provider'
import { PossessionsProvider } from '../possessions/possessions.provider'
import * as Counter from '../../actions'
import { AppState } from '../../modules'
import * as fromCounter from './reducers'

@IonicPage({
	name: 'Claims',
	segment: 'claims'
})
@Component({
	selector: 'page-claims',
	templateUrl: 'claims.html'
})
export class ClaimsPage {
	account = this.possessionsProvider.account
	availableGas
	count$

	constructor (
		private claimsProvider: ClaimsProvider,
		private possessionsProvider: PossessionsProvider,
	  private store: Store<AppState>
	) {
		this.count$ = store.pipe(select(fromCounter.selectCounterValue))
	}

	ionViewDidLoad () {
		this.getData()
	}

	getData () {
		this.claimsProvider.getClaims()
		    .then(res => {
			    this.availableGas = res['available']
		    })
	}

	doClaim () {
		if (this.claimsProvider.hasDecrypt()) {
			this.claimsProvider.doClaims()
		} else {

			this.claimsProvider.doClaims()
		}
	}

	increment () {
		this.store.dispatch(new Counter.Increment())
	}

	decrement () {
		this.store.dispatch(new Counter.Decrement())
	}

	reset () {
		this.store.dispatch(new Counter.Reset())
	}
}
