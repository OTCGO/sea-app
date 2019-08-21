import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { NodePickPage } from './node-pick';

@NgModule({
  declarations: [
    NodePickPage,
  ],
  imports: [
    IonicPageModule.forChild(NodePickPage),
  ],
})
export class NodePickPageModule {}
