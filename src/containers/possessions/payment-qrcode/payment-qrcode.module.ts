import { NgModule } from '@angular/core'
import { IonicPageModule } from 'ionic-angular'
import { PaymentQRCodePage } from './payment-qrcode'
import { NgxQRCodeModule } from 'ngx-qrcode2'
import { TranslateModule } from '@ngx-translate/core'

const COMPONENT = [PaymentQRCodePage]

@NgModule({
  declarations: COMPONENT,
  imports: [
    TranslateModule,
    NgxQRCodeModule,
    IonicPageModule.forChild(PaymentQRCodePage)
  ],
  exports: COMPONENT
})
export class PaymentQRCodeModule {}
