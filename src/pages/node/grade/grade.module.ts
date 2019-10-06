import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { GradePage } from './grade';
import { NodePageModule } from '../node.module'

@NgModule({
  declarations: [
    GradePage,
  ],
  imports: [
    IonicPageModule.forChild(GradePage),
    NodePageModule
  ],
})
export class GradePageModule { }
