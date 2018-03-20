import { Injectable } from '@angular/core'
import {
	Actions,
	Effect,
	ofType
} from '@ngrx/effects'
import { fromPromise } from 'rxjs/observable/fromPromise'
import { of } from 'rxjs/observable/of'
import {
	catchError,
	map,
	switchMap
} from 'rxjs/operators'
import { FileStorageProvider } from '../../providers'

import { SettingsActionTypes, Load, LoadFail, LoadSuccess, ChangeCurrency, ChangeLanguage } from '../actions/settings.action'
import {
	DEFAULT_SETTING,
	OTCGO_SETTING_FILE_NAME
} from '../../shared/constants'

@Injectable()
export class SettingsEffects {
	@Effect()
	Load$ = this.actions$.pipe(
		ofType<Load>(SettingsActionTypes.LOAD),
		map(_ => fromPromise(this.fileStorage.checkFile(OTCGO_SETTING_FILE_NAME))),
		switchMap(exits =>
			exits
				? fromPromise(this.fileStorage.read(OTCGO_SETTING_FILE_NAME))
				    .map(file => new LoadSuccess(JSON.parse(file)))  // If file exits, read the file
				: of(new LoadSuccess(DEFAULT_SETTING))  // if don't, that mean it did't setup yet, setup with default
		),
		catchError(error => of(new LoadFail(error)))
	)

	/*@Effect()
	Save$ = this.actions$.piep()*/

	constructor (private actions$: Actions, private fileStorage: FileStorageProvider) {}
}
