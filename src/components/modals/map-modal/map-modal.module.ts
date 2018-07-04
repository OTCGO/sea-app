import { TranslateModule } from '@ngx-translate/core'
import { MapModalComponent } from './map-modal'
import { NgModule } from '@angular/core'
import { IonicPageModule } from 'ionic-angular'


const COMPONENTS = [
  MapModalComponent
]

@NgModule({
  declarations: COMPONENTS,
  imports: [
		TranslateModule.forChild(),
    IonicPageModule.forChild(MapModalComponent),
  ],
  exports: COMPONENTS
})
export class MapModalModule {}
