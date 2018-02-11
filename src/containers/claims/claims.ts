import { Component } from '@angular/core'
import { IonicPage } from 'ionic-angular'
import { ApiProvider } from '../../providers/api/api.provider'
import { ClaimsProvider } from './claims.provider'


@IonicPage({
	name: 'Claims',
	segment: 'claims'
})
@Component({
	selector: 'page-claims',
	templateUrl: 'claims.html'
})
export class ClaimsPage {
	availableGas

	constructor (private apiProvider: ApiProvider, private claimsProvider: ClaimsProvider) {}

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

	}
}
