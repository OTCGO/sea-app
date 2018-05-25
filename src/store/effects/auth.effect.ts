import { Injectable } from '@angular/core'
import { Store, ActionsSubject } from '@ngrx/store'
import { Actions, Effect, ofType } from '@ngrx/effects'
import { of } from 'rxjs/observable/of'
import {
	catchError,
	exhaustMap,
	map,
	tap
} from 'rxjs/operators'
import { merge } from 'ramda'
import {
	Wallet
} from '../../shared/typings'
import {
	LoadingProvider,
	RouterProvider,
	WalletProvider
} from '../../providers'
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
	LoginOldWalletFail,
	LoginOldWalletSuccess,
	LoginLedger,
	LoginLedgerFail,
	LoginLedgerSuccess,
	LoginNeoDun,
	LoginNeoDunFail,
	LoginNeoDunSuccess,
	CreateWallet,
	CreateWalletSuccess,
	CreateWalletFail,
} from '../actions/auth.action'
import { WalletActions, ContactsActions } from '../actions'
import { RootState } from '..//reducers'
import { WalletActionTypes } from '../actions/wallet.action'


@Injectable()
export class AuthEffects {
	@Effect()
	Login$ =
		this.actions$.pipe(
			ofType<Login>(AuthActionTypes.LOGIN),
			map(action => action.payload),
			exhaustMap((walletFile) => {
				const nepWallet: Wallet = new wallet.Wallet(walletFile)
				let contacts = nepWallet.extra && nepWallet.extra.contacts
        nepWallet.accounts.forEach(account => {
          if (account.extra && account.extra.contacts) {
            contacts = merge(contacts, account.extra.contacts)
          }
        })

				return contacts
					? [new LoginSuccess(nepWallet), new ContactsActions.Load(contacts)]
					: [new LoginSuccess(nepWallet)]
			}),
			catchError(error => of(new LoginFail(error)))
		)

	@Effect()
	LoginOldWallet$ =
		this.actions$.pipe(
			ofType<LoginOldWallet>(AuthActionTypes.LOGIN_OLD_WALLET),
			map(action => action.payload),
			exhaustMap(({ oldWallet, passphrase }) => {
				return this.walletProvider.upgradeToNEP5Account(oldWallet, passphrase, true)
          .pipe(
            map(account => new WalletActions.AddAccount(account)),
            map(() => new LoginOldWalletSuccess()),
            catchError(error => of(new LoginOldWalletFail(error)))
          )
			}),
			catchError(error => of(new LoginOldWalletFail(error)))
		)

	@Effect()
	LoginWIF$ =
		this.actions$.pipe(
			ofType<LoginWif>(AuthActionTypes.LOGIN_WIF),
			map(action => action.payload),
			exhaustMap(wifValue => {
				return [
					new WalletActions.AddAccount(wifValue as any),
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
			exhaustMap(({ passphrase, wif, label }) => {
				this.lp.emit(true)
				const accountTemp = new wallet.Account(wif || wallet.generatePrivateKey())
				const { WIF, address } = accountTemp
				const encrypted = wallet.encrypt(WIF, passphrase)

				const account = new wallet.Account({
					address,
					label,
					isDefault: true,
					lock: false,
					key: encrypted,
					contract: null,
					extra: null
				} as any)
				this.lp.emit(false)
				return [
					new WalletActions.AddAccount(account),
					new CreateWalletSuccess()
				]
			}),
			catchError(error => of(new CreateWalletFail(error)))
		)

	@Effect({ dispatch: false })
	CreateWalletSuccess$ =
		this.actions$.pipe(
			ofType(
				AuthActionTypes.CREATE_WALLET_SUCCESS
			),
			tap(() => this.router.setRoot('BackupWallet'))
		)

	@Effect({ dispatch: false })
	LoginSuccess$ =
		this.actions$.pipe(
			ofType(
				AuthActionTypes.LOGIN_SUCCESS,
				AuthActionTypes.LOGIN_WIF_SUCCESS,
				AuthActionTypes.LOGIN_OLD_WALLET_SUCCESS,
			),
			tap(() => this.router.setRoot('Tabs'))
		)

	constructor (
		private actions$: Actions,
		private store$: Store<RootState>,
		private actionsSubject$: ActionsSubject,
		private walletProvider: WalletProvider,
		private router: RouterProvider,
		private lp: LoadingProvider
	) { }
}
