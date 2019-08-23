import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { JoinPage } from './join';
// import { NodeMenuComponent } from '../../../components/node-menu/node-menu'
import { NodePageModule } from '../node.module'

@NgModule({
  declarations: [
    JoinPage,
  ],
  imports: [
    IonicPageModule.forChild(JoinPage),
    NodePageModule
  ],
})
export class JoinPageModule { }
