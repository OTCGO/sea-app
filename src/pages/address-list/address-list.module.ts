import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AddressListPage } from './address-list';

@NgModule({
  declarations: [
    AddressListPage,
  ],
  imports: [
    IonicPageModule.forChild(AddressListPage),
  ],
})
export class AddressListPageModule {}
