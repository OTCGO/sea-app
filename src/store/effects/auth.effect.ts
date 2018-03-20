import { Injectable } from '@angular/core'
import { Actions, Effect, ofType } from '@ngrx/effects'
import { of } from 'rxjs/observable/of'
import { catchError, exhaustMap, map } from 'rxjs/operators'
import { Account } from '../../shared/typings'
import { WalletProvider } from '../../providers'
import { wallet } from '../../libs/neon'

import {
	AuthActionTypes,
	Login,
	LoginFail,
	LoginSuccess,
	LoginWif,
	LoginWifFail,
	LoginWifSuccess,
	LoginOldWallet,
	LoginLedgerFail,
	LoginOldWalletSuccess,
	LoginOldWalletFail, CreateWallet, CreateWalletSuccess, CreateWalletFail,
} from '../actions/auth.action'

import { WalletActions } from '../actions'


/* TODO: AmagiDDmxh - Should we dealing with passphrase decrypt logic here? */
@Injectable()
export class AuthEffects {
	@Effect()
	Login$ =
		this.actions$.pipe(
			ofType<Login>(AuthActionTypes.LOGIN),
			map(action => action.payload),
			exhaustMap((walletFile) => {
				const nepWallet = new wallet.Wallet(walletFile)
				return of(new LoginSuccess(nepWallet))
			}),
			catchError(error => of(new LoginFail(error)))
		)

	@Effect()
	LoginOldWallet$ =
		this.actions$.pipe(
			ofType<LoginOldWallet>(AuthActionTypes.LOGIN_OLD_WALLET),
			map(action => action.payload),
			exhaustMap(({ oldWallet, passphrase }) => {
				const account: Account = this.walletProvider.upgradeToNEP5Account(oldWallet, passphrase)
				account.isDefault = true
				return [
					new WalletActions.AddAccount(account),
					new LoginOldWalletSuccess()
				]
			}),
			catchError(error => of(new LoginOldWalletFail(error)))
		)

	@Effect()
	LoginWIF$ =
		this.actions$.pipe(
			ofType<LoginWif>(AuthActionTypes.LOGIN_WIF),
			map(action => action.payload),
			exhaustMap(wifValue => {
				const account = new wallet.Account(wifValue)
				return [
					new WalletActions.AddAccount(account),
					new LoginWifSuccess()
				]
			}),
			catchError(error => of(new LoginWifFail(error)))
		)

	@Effect()
	CreateWallet =
		this.actions$.pipe(
			ofType<CreateWallet>(AuthActionTypes.CREATE_WALLET),
			map(action => action.payload),
			exhaustMap(account => {
				return [
					new WalletActions.AddAccount(account),
					new CreateWalletSuccess()
				]
			}),
			catchError(error => of(new CreateWalletFail(error)))
		)

	constructor (
		private actions$: Actions,
		private walletProvider: WalletProvider
	) {}
}
