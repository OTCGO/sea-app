import { NgModule } from '@angular/core'
import { LoginPage } from './login'
import { IonicPageModule } from 'ionic-angular'
import { TranslateModule } from '@ngx-translate/core'


const COMPONENTS = [
  LoginPage
]

@NgModule({
  declarations: COMPONENTS,
  imports: [
    TranslateModule.forChild(),
    IonicPageModule.forChild(LoginPage)
  ],
  exports: COMPONENTS
})
export class LoginPageModule {}
