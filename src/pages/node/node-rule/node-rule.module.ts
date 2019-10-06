import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { NodeRulePage } from './node-rule';
import { NodePageModule } from '../node.module'

@NgModule({
  declarations: [
    NodeRulePage,
  ],
  imports: [
    IonicPageModule.forChild(NodeRulePage),
    NodePageModule
  ],
})
export class NodeRulePageModule { }
