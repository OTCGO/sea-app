import { Action } from '@ngrx/store'
import { Version } from '../../shared/models/version.model'

export enum VersionActionTypes {
	LOAD = '[Version] Load',
	LOAD_FAIL = '[Version] Load Fail',
	LOAD_SUCCESS = '[Version] Load Success',

}

export class Load implements Action {
    readonly type = VersionActionTypes.LOAD
    constructor (public payload: Version) {}
}

export class LoadSuccess implements Action {
	readonly type = VersionActionTypes.LOAD_SUCCESS

	constructor (public payload: Version) {}
}

export class LoadFail implements Action {
	readonly type = VersionActionTypes.LOAD_FAIL

	constructor (public payload: Error | string) {}
}



export type VersionActions =
	Load
	| LoadSuccess
	| LoadFail
