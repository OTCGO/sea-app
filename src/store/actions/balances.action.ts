import { Action } from '@ngrx/store'
import { IBalanceEntities } from '../../shared/models/balances.model'

export enum BalancesActionTypes {
	LOAD = '[Balances] Load',
	LOAD_FAIL = '[Balances] Load Error',
	LOAD_SUCCESS = '[Balances] Load Success',
	SELECT = '[Balances] Select'
}

export class Load implements Action {
	readonly type = BalancesActionTypes.LOAD
}

export class LoadSuccess implements Action {
	readonly type = BalancesActionTypes.LOAD_SUCCESS

	constructor (public payload: IBalanceEntities) {}
}

export class LoadFail implements Action {
	readonly type = BalancesActionTypes.LOAD_FAIL

	constructor (public payload: Error | string) {}
}

export class Select implements Action {
	readonly type = BalancesActionTypes.SELECT

	constructor (public payload: string) {}
}

export type BalancesActions = Load | LoadSuccess | LoadFail | Select
