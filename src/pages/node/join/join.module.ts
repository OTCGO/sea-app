import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { JoinPage } from './join';
import { NodeMenuComponent } from '../../../components/node-menu/node-menu'

@NgModule({
  declarations: [
    NodeMenuComponent,
    JoinPage,
  ],
  imports: [
    IonicPageModule.forChild(JoinPage),
  ],
})
export class JoinPageModule { }
