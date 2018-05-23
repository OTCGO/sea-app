import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core'
import { IonicPageModule } from 'ionic-angular'

import { RemoveAccountModal } from './remove-account-modal';

@NgModule({
    imports: [
    	TranslateModule.forChild(),
    	IonicPageModule.forChild(RemoveAccountModal)
		],
    declarations: [RemoveAccountModal]
})
export class ManageWalletRemoveModalModule { }
