import { Injectable } from '@angular/core'
import { Actions, Effect, ofType } from '@ngrx/effects'
import { Loading } from 'ionic-angular'


@Injectable()
export class LoadingEffect {
	loading: Loading

	@Effect({ dispatch: false })
	Loading$ =
		this.actions$.pipe(
			ofType(

			),
		)

	constructor (private actions$: Actions, private loadingCtrl) {}
}
