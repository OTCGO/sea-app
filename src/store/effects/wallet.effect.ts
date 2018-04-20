import { Injectable } from '@angular/core'
import { Actions, Effect, ofType } from '@ngrx/effects'
import { Store } from '@ngrx/store'
import { from } from 'rxjs/observable/from'
import { fromPromise } from 'rxjs/observable/fromPromise'
import { of } from 'rxjs/observable/of'
import { catchError, concatMap, exhaustMap, map, tap, withLatestFrom } from 'rxjs/operators'
import { RootState } from '../reducers'
import { RouterProvider, WalletProvider } from '../../providers'
import { wallet } from '../../libs/neon'
import {
	getAccounts,
	getEntity
} from '../selectors/wallet.selector'
import { Wallet } from '../../shared/typings'
import {
	WalletActionTypes, Load, LoadSuccess, LoadFail, AddAccount, AddAccountSuccess, AddAccountFail
} from '../actions/wallet.action'
import { ContactsActionTypes } from '../actions/contacts.action'
import { ContactsActions } from '../actions'

import 'rxjs/add/operator/do'
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/mergeMap'
import 'rxjs/add/operator/withLatestFrom'


@Injectable()
export class WalletEffects {
	@Effect()
	Load$ =
		this.actions$
				.pipe(
					ofType<Load>(WalletActionTypes.LOAD),
					map(_=> fromPromise(this.walletProvider.checkWalletFile())),
					concatMap(exists => exists ? fromPromise(this.walletProvider.readWalletFile()).map(fileStr => JSON.parse(fileStr) as Wallet) : []),
					exhaustMap((file?: Wallet) =>
						file
							? from([
									new LoadSuccess(file),
									new ContactsActions.Load(file.extra.contacts)
								])
							: of(new LoadFail('Require login'))
					),
					catchError(e => of(new LoadFail(e)))
				)

	@Effect({ dispatch: false })
	LoadSuccess$ =
		this.actions$.pipe(
			ofType(
				WalletActionTypes.LOAD_SUCCESS,
			),
			tap(() => {
				console.log(this.router)
				this.router.setRoot('Tabs')
			})
		)

	@Effect()
	AddAccount$ =
		this.actions$
				.pipe(
					ofType<AddAccount>(WalletActionTypes.ADD_ACCOUNT),
					map(action => action.payload),
					withLatestFrom(this.store$.select(getAccounts), (accountFile, accounts) => ({accountFile, accounts})),
					map(({ accountFile, accounts }) => {
						if (accountFile instanceof wallet.Account) {
							const { _WIF, address, encrypted: key, label, } = accountFile as any
							let account = new wallet.Account(_WIF || { address, key, label })
							if (!accounts.some(account => account.isDefault)) account.isDefault = true
							return new AddAccountSuccess(account)
						}
						const account = new wallet.Account(accountFile)
						if (!accounts.some(account => account.isDefault)) account.isDefault = true
						return new AddAccountSuccess(account)
					}),
					catchError(e => of(new AddAccountFail(e)))
				)

	@Effect({ dispatch: false })
	SaveWalletFile$ =
		this.actions$
				.ofType(
					WalletActionTypes.LOAD_SUCCESS,
					WalletActionTypes.ADD_ACCOUNT_SUCCESS,
					WalletActionTypes.ADD_ACCOUNTS_SUCCESS,
					WalletActionTypes.REMOVE_ACCOUNT,
					WalletActionTypes.CHANGE_ACCOUNT_LABEL,
					WalletActionTypes.SET_DEFAULT_ACCOUNT,
					WalletActionTypes.SAVE_WALLET,
					ContactsActionTypes.UPDATE,
					ContactsActionTypes.REMOVE_SUCCESS,
				)
				.withLatestFrom(this.store$.select(getEntity))
				.do(([_, walletEntities]) => {
					try {
						console.log('Save Wallet file')
						this.walletProvider.saveWalletFile(new wallet.Wallet(walletEntities).export())
					} catch (e) {
						console.log('Catch Error on SaveWalletFile$ .do', e)
					}
				})
				.catch((err, caught) => {
					console.log('Catch on SaveWalletFile')
					console.log(err, caught)
					return caught
				})

	constructor (
		private actions$: Actions,
		private store$: Store<RootState>,
		private walletProvider: WalletProvider,
		private router: RouterProvider
	) {}
}
