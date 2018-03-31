import { Action } from '@ngrx/store'

export enum ContactsActionTypes {
	LOAD = '[Contacts] Load Contacts',
	LOAD_FAIL = '[Contacts] Load Contacts Fail',
	LOAD_SUCCESS = '[Contacts] Load Contacts Success',
}

export class Load implements Action {
	readonly type = ContactsActionTypes.LOAD
	constructor () {}
}

export type ContactsActions = Load
