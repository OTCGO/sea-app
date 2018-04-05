import { Action } from '@ngrx/store'
import { Update as EntityUpdate } from '@ngrx/entity'
import { Contact } from '../../shared/models'

export enum ContactsActionTypes {
	LOAD = '[Contacts] Load Contacts',
	LOAD_FAIL = '[Contacts] Load Contacts Fail',
	LOAD_SUCCESS = '[Contacts] Load Contacts Success',
	REMOVE = '[Contacts] Remove Contacts',
	REMOVE_FAIL = '[Contacts] Remove Contacts Fail',
	REMOVE_SUCCESS = '[Contacts] Remove Contacts Success',
	UPDATE = '[Contacts] Update Contacts',
	SELECT = '[Contacts] Select Contacts',
	CLEAN_SELECT = '[Contacts] Clean Select'
}

export class Load implements Action {
	readonly type = ContactsActionTypes.LOAD
	constructor (public payload: Contact[]) {}
}

export class LoadFail implements Action {
	readonly type = ContactsActionTypes.LOAD_FAIL
	constructor (public payload: Error | string) {}
}

export class LoadSuccess implements Action {
	readonly type = ContactsActionTypes.LOAD_SUCCESS
	constructor (public payload: Contact[]) {}
}

export class Remove implements Action {
	readonly type = ContactsActionTypes.REMOVE
	constructor (public payload: Contact) {}
}

export class RemoveFail implements Action {
	readonly type = ContactsActionTypes.REMOVE_FAIL
	constructor (public payload: Error | string) {}
}

export class RemoveSuccess implements Action {
	readonly type = ContactsActionTypes.REMOVE_SUCCESS
	constructor (public payload: Contact) {}
}

export class Select implements Action {
	readonly type = ContactsActionTypes.SELECT
	constructor (public payload: string) {}
}

export class CleanSelect implements Action {
	readonly type = ContactsActionTypes.CLEAN_SELECT
}

export class Update implements Action {
	readonly type = ContactsActionTypes.UPDATE
	constructor (public payload: EntityUpdate<Contact>) {}
}


export type ContactsActions =
	Load
	| LoadFail
	| LoadSuccess
	| Remove
	| RemoveFail
	| RemoveSuccess
	| Update
	| Select
	| CleanSelect
