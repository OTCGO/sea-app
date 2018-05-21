import { Injectable } from '@angular/core'
import {
	Actions,
	Effect,
	ofType
} from '@ngrx/effects'
import { Store } from '@ngrx/store'
import { from } from 'rxjs/observable/from'
import { fromPromise } from 'rxjs/observable/fromPromise'
import { of } from 'rxjs/observable/of'
import {
	catchError,
	concatMap,
	exhaustMap,
	map,
	pluck,
	tap,
	withLatestFrom
} from 'rxjs/operators'
import { wallet } from '../../libs/neon'
import { RootState } from '../reducers'
import { Account, Wallet } from '../../shared/typings'
import { ContactsActions } from '../actions'
import { ContactsActionTypes } from '../actions/contacts.action'
import {
	AddAccount,
	AddAccountFail,
	AddAccountSuccess,
	Load,
	LoadFail,
	LoadSuccess,
	WalletActionTypes
} from '../actions/wallet.action'
import {
	RouterProvider,
	WalletProvider
} from '../../providers'
import {
	getAccounts,
	getEntity
} from '../selectors/wallet.selector'

@Injectable()
export class WalletEffects {
	@Effect()
	Load$ =
		this.actions$
				.pipe(
					ofType<Load>(WalletActionTypes.LOAD),
					map(_ => fromPromise(this.walletProvider.checkWalletFile())),
					concatMap(exists => exists
						? fromPromise(this.walletProvider.readWalletFile()).map(fileStr => JSON.parse(fileStr) as Wallet)
						: []),
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
			ofType(WalletActionTypes.LOAD_SUCCESS, ),
			tap(() => {
				this.router.setRoot('Tabs')
			})
		)

	@Effect()
	AddAccount$ =
		this.actions$.pipe(
			ofType<AddAccount>(WalletActionTypes.ADD_ACCOUNT),
			pluck<AddAccount, Account>('payload'),
			withLatestFrom(this.store$.select(getAccounts), (accountFile, accounts) => ({ accountFile, accounts })),
			map(({ accountFile, accounts }) => {
				if (accountFile instanceof wallet.Account) {
					const { _WIF, address, encrypted: key, label, } = accountFile as any
					const appAcct = new wallet.Account(_WIF || { address, key, label })
					if (!accounts.some(acct => acct.isDefault)) appAcct.isDefault = true
					return new AddAccountSuccess(appAcct)
				}
				const account = new wallet.Account(accountFile)
				if (!accounts.some(acct => acct.isDefault)) account.isDefault = true
				return new AddAccountSuccess(account)
			}),
			catchError(e => of(new AddAccountFail(e)))
		)

	@Effect({ dispatch: false })
	SaveWalletFile$ =
		this.actions$.pipe(
			ofType(
				WalletActionTypes.LOAD_SUCCESS,
				WalletActionTypes.ADD_ACCOUNT_SUCCESS,
				WalletActionTypes.ADD_ACCOUNTS_SUCCESS,
				WalletActionTypes.REMOVE_ACCOUNT,
				WalletActionTypes.CHANGE_ACCOUNT_LABEL,
				WalletActionTypes.SET_DEFAULT_ACCOUNT,
				WalletActionTypes.SAVE_WALLET,
				ContactsActionTypes.UPDATE,
				ContactsActionTypes.REMOVE_SUCCESS,
			),
			withLatestFrom(this.store$.select(getEntity)),
			tap(([_, walletEntities]) => {
				try {
					console.log('Save Wallet file', walletEntities)
					this.walletProvider.saveWalletFile(new wallet.Wallet(walletEntities).export())
				} catch (e) {
					console.log('Catch Error on SaveWalletFile$ .do', e)
				}
			}),
			catchError((err, caught) => {
				console.log('Catch on SaveWalletFile')
				console.log(err, caught)
				return caught
			})
		)

	constructor (
		private actions$: Actions,
		private store$: Store<RootState>,
		private walletProvider: WalletProvider,
		private router: RouterProvider
	) {}
}
