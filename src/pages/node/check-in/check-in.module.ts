import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CheckInPage } from './check-in';
import { AdDirective } from '../../../directive/ad.directive';
import { NodePageModule } from '../node.module'
import { NodeMenuComponent } from '../../../components/node-menu/node-menu';
import { AlertBurnComponent } from '../../../components/alert-burn/alert-burn';
import { SuccessAlertComponent } from '../../../components/success-alert/success-alert';


@NgModule({
  declarations: [
    CheckInPage,
    AdDirective,
    // NodeMenuComponent,
    AlertBurnComponent,
  ],
  imports: [
    IonicPageModule.forChild(CheckInPage),
    NodePageModule,
    // NodeMenuComponent
  ],
  exports: [AlertBurnComponent],
  // entryComponents: [SuccessAlertComponent]
})
export class CheckInPageModule { }
