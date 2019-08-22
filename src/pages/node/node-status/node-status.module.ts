import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { NodeStatusPage } from './node-status';
import { NodePageModule } from '../node.module'

@NgModule({
  declarations: [
    NodeStatusPage,
  ],
  imports: [
    IonicPageModule.forChild(NodeStatusPage),
    NodePageModule
  ],
})
export class NodeStatusPageModule { }
