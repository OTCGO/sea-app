import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { GradePage } from './grade';

@NgModule({
  declarations: [
    GradePage,
  ],
  imports: [
    IonicPageModule.forChild(GradePage),
  ],
})
export class GradePageModule {}
