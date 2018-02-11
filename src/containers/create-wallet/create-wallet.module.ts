import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CreateWalletPage } from './create-wallet';

const COMPONENTS = [
  CreateWalletPage
]

@NgModule({
  declarations: COMPONENTS,
  imports: [
    IonicPageModule.forChild(CreateWalletPage),
  ],
  exports: COMPONENTS
})
export class CreateWalletPageModule {}
