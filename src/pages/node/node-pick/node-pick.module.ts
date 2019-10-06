import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { NodePickPage } from './node-pick';
// import { NodeMenuComponent } from '../../../components/node-menu/node-menu'
import { NodePageModule } from '../node.module'


@NgModule({
  declarations: [
    NodePickPage,
    //  NodeMenuComponent
  ],
  imports: [
    IonicPageModule.forChild(NodePickPage),
    NodePageModule
  ],
})
export class NodePickPageModule { }
