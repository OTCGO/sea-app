import { Action } from '@ngrx/store'

export enum TransactionsActionTypes {
	SEND = '[Transaction] Send',
	SEND_FAIL = '[Transaction] Send Fail',
	SEND_SUCCESS = '[Transaction] Send Success',
	SELECT_CONTACT = '[Transaction] Select Contact',
	CLEAN_SELECTED_CONTACT = '[Transaction] Clean Selected Contact'
}

export class Send implements Action {
	readonly type = TransactionsActionTypes.SEND
}

export class SendSuccess implements Action {
	readonly type = TransactionsActionTypes.SEND_SUCCESS

	constructor (public payload) {}
}

export class SendFail implements Action {
	readonly type = TransactionsActionTypes.SEND_FAIL

	constructor (public payload: string | Error) {}
}

export class SelectContact implements Action {
	readonly type = TransactionsActionTypes.SELECT_CONTACT

	constructor (public payload: string) {}
}

export class CleanSelectedContact implements Action {
	readonly type = TransactionsActionTypes.CLEAN_SELECTED_CONTACT
}

export type TransactionsActions =
	Send
	| SendFail
	| SendSuccess
	| SelectContact
	| CleanSelectedContact
