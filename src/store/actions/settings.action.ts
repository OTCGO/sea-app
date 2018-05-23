import { Action } from '@ngrx/store'
import {
	I18n,
	ICurrency,
	ISetting
} from '../../shared/models'

export enum SettingsActionTypes {
	LOAD = '[Settings] Load',
	LOAD_FAIL = '[Settings] Load Fail',
	LOAD_SUCCESS = '[Settings] Load Success',
	CHANGE_LANGUAGE = '[Settings] Change Language',
	CHANGE_CURRENCY = '[Settings] Change Currency',
  SAVE = '[Settings] Save Setting'
}

export class Load implements Action {
	readonly type = SettingsActionTypes.LOAD
}

export class LoadSuccess implements Action {
	readonly type = SettingsActionTypes.LOAD_SUCCESS

	constructor (public payload: ISetting) { }
}

export class LoadFail implements Action {
	readonly type = SettingsActionTypes.LOAD_FAIL

	constructor (public payload: string | Error) {}
}

export class ChangeLanguage implements Action {
	readonly type = SettingsActionTypes.CHANGE_LANGUAGE

	constructor (public payload: keyof I18n) {}
}

export class ChangeCurrency implements Action {
	readonly type = SettingsActionTypes.CHANGE_CURRENCY

	constructor (public payload: keyof ICurrency) {}
}

export class Save implements Action {
  readonly type = SettingsActionTypes.SAVE
}

export type SettingsActions = Load | LoadFail | LoadSuccess | ChangeLanguage | ChangeCurrency | Save
