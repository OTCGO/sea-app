import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { NodePostPage } from './node-post';
import { NodePageModule } from '../node.module'

@NgModule({
  declarations: [
    NodePostPage,
  ],
  imports: [
    IonicPageModule.forChild(NodePostPage),
    NodePageModule
  ],
})
export class NodePostPageModule { }
