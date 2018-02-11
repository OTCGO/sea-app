import { NgModule } from '@angular/core'
import { LoginPage } from './login'
import { IonicPageModule } from 'ionic-angular'

const COMPONENTS = [
  LoginPage
]

@NgModule({
  declarations: COMPONENTS,
  imports: [
    IonicPageModule.forChild(LoginPage)
  ],
  exports: COMPONENTS
})
export class LoginPageModule {}