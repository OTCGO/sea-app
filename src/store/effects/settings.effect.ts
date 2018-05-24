import { Injectable } from '@angular/core'
import {
	Actions,
	Effect,
	ofType
} from '@ngrx/effects'
import { Store } from '@ngrx/store'
import { TranslateService } from '@ngx-translate/core'
import { fromPromise } from 'rxjs/observable/fromPromise'
import { of } from 'rxjs/observable/of'
import {
  catchError,
  map,
  switchMap,
  tap, withLatestFrom
} from 'rxjs/operators'
import { FileStorageProvider } from '../../providers'

import { SettingsActionTypes, Load, LoadFail, LoadSuccess, ChangeCurrency, ChangeLanguage, Save } from '../actions/settings.action'
import {
	DEFAULT_SETTING,
	OTCGO_SETTING_FILE_NAME
} from '../../shared/constants'
import { RootState } from '../reducers'
import { getCurrency, getLanguage } from '../selectors/settings.selector'

@Injectable()
export class SettingsEffects {
	@Effect()
	Load$ = this.actions$.pipe(
		ofType<Load>(SettingsActionTypes.LOAD),
		map(() => fromPromise(this.fileStorage.checkFile(OTCGO_SETTING_FILE_NAME))),
		switchMap(exits =>
			exits
				? fromPromise(this.fileStorage.read(OTCGO_SETTING_FILE_NAME))
				    .map(file => new LoadSuccess(JSON.parse(file)))  // If file exits, read the file
				: of(new LoadSuccess(DEFAULT_SETTING))  // if don't, setting up with default
		),
		catchError(error => of(new LoadFail(error)))
	)

	@Effect({ dispatch: false })
	ChangeLanguage$ = this.actions$.pipe(
		ofType<ChangeLanguage>(SettingsActionTypes.CHANGE_LANGUAGE),
		map(action => action.payload),
		tap(locale => this.ts.use(locale))
	)

	@Effect({ dispatch: false })
	Save$ = this.actions$.pipe(
	  ofType<Save>(
	    SettingsActionTypes.CHANGE_LANGUAGE,
      SettingsActionTypes.CHANGE_CURRENCY,
      SettingsActionTypes.SAVE
    ),
    withLatestFrom(this.store$.select(getCurrency), this.store$.select(getLanguage)),
    map(([_, currency, language]) => this.fileStorage.save(OTCGO_SETTING_FILE_NAME, { currency, language })),
    catchError((err, caught) => {
      console.log('Catch on SaveWalletFile')
      console.log(err, caught)
      return caught
    })
  )

	constructor (
	  private actions$: Actions,
    private store$: Store<RootState>,
    private fileStorage: FileStorageProvider,
    private ts: TranslateService
  ) {}
}
