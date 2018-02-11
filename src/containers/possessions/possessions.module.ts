import { NgModule } from '@angular/core'
import { PossessionsPage } from './possessions'
import { IonicPageModule } from 'ionic-angular'
import { PipesModule } from '../../pipes/pipes.module'


const COMPONENT = [
  PossessionsPage
]

@NgModule({
  declarations: COMPONENT,
  imports: [
    IonicPageModule.forChild(PossessionsPage),
    PipesModule
  ],
  exports: COMPONENT
})
export class PossessionsPageModule {}