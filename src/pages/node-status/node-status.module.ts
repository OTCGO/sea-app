import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { NodeStatusPage } from './node-status';

@NgModule({
  declarations: [
    NodeStatusPage,
  ],
  imports: [
    IonicPageModule.forChild(NodeStatusPage),
  ],
})
export class NodeStatusPageModule {}
