import { NgModule } from '@angular/core'
import { LoginPage } from './login'
import { IonicPageModule } from 'ionic-angular'
import { TranslateModule } from '@ngx-translate/core'
import { LoginFormModule } from '../../components/login'
import { VersionModule } from '../../components/version'

@NgModule({
  declarations: [
    LoginPage,
    // VersionComponent
  ],
  imports: [
    LoginFormModule,
    VersionModule,
    TranslateModule.forChild(),
    IonicPageModule.forChild(LoginPage)
  ]
})
export class LoginPageModule {}
