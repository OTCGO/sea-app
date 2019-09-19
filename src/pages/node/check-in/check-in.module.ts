import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CheckInPage } from './check-in';
import { AdDirective } from '../../../directive/ad.directive';
// import { NodePageModule } from '../node.module'
import { NodeMenuComponent } from '../../../components/node-menu/node-menu';
import { AlertBurnComponent } from '../../../components/alert-burn/alert-burn';

@NgModule({
  declarations: [
    CheckInPage,
    AdDirective,
    NodeMenuComponent,
    AlertBurnComponent
  ],
  imports: [
    IonicPageModule.forChild(CheckInPage),
    // NodePageModule,
    // NodeMenuComponent
  ],
  exports: [NodeMenuComponent, AlertBurnComponent],
  entryComponents: [NodeMenuComponent]
})
export class CheckInPageModule { }
