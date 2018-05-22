import { NgModule } from '@angular/core'
import { TranslateModule } from '@ngx-translate/core'
import { IonicModule } from 'ionic-angular'
import { LoginForm } from './login-form'

const COMPONENTS = [LoginForm]

// TODO(Amagi): Using IonicModule may be become a huge cost right there, Optimize later
@NgModule({
	declarations: COMPONENTS,
	imports: [
		IonicModule,
		TranslateModule.forChild()
	],
	exports: COMPONENTS
})
export class LoginFormModule {}
