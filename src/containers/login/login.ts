import {
	Component,
	OnInit
} from '@angular/core'
import { Store } from '@ngrx/store'
import {
	IonicPage,
	NavController,
	NavParams
} from 'ionic-angular'
import { LoadingProvider, NotificationProvider } from '../../providers'
import { nep5Wallet } from '../../shared/userWallet'
import { AuthActions } from '../../store/actions'
import { RootState } from '../../store/reducers'
import { AuthSelectors } from '../../store/selectors'


@IonicPage({
	name: 'Login',
	segment: 'login'
})
@Component({
	selector: 'page-login',
	templateUrl: 'login.html',
})
export class LoginPage implements OnInit {
	translationPrefix = 'LOGIN.'

	constructor (
		public navCtrl: NavController,
		public navParams: NavParams,
		private np: NotificationProvider,
		private lp: LoadingProvider,
		private store: Store<RootState>
	) { }

	ngOnInit () {
		this.store.select(AuthSelectors.getError).subscribe(error => error && this.np.emit({ message: error }))
		this.store.select(AuthSelectors.getLoading).subscribe(bool => bool && this.lp.emit(bool))
	}

	loginNEP5 = file => this.store.dispatch(new AuthActions.Login(file))

	loginWIF (wifValue) {
		return wifValue === 'test'
			? this.loginNEP5(nep5Wallet)
			: this.store.dispatch(new AuthActions.LoginWif(wifValue))
	}

	loginOldWallet = ({ oldWallet, passphrase }) =>
		this.store.dispatch(new AuthActions.LoginOldWallet({ oldWallet, passphrase }))
}
