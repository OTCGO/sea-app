import { NgModule } from '@angular/core'
import { IonicPageModule } from 'ionic-angular'
import { PaymentQRCodePage } from './payment-qrcode'
import { NgxQRCodeModule } from 'ngx-qrcode2'

const COMPONENT = [PaymentQRCodePage]

@NgModule({
  declarations: COMPONENT,
  imports: [
    IonicPageModule.forChild(PaymentQRCodePage),
    NgxQRCodeModule
  ],
  exports: COMPONENT
})
export class PaymentQRCodeModule {}