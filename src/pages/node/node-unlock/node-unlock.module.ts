import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { NodeUnlockPage } from './node-unlock';
import { NodePageModule } from '../node.module'

@NgModule({
  declarations: [
    NodeUnlockPage,
  ],
  imports: [
    IonicPageModule.forChild(NodeUnlockPage),
    NodePageModule
  ],
})
export class NodeUnlockPageModule { }
