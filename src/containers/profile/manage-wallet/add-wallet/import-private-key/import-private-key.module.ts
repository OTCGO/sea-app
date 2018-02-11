import { NgModule } from '@angular/core'
import { ImportPrivateKeyPage } from './import-private-key'
import { IonicPageModule } from 'ionic-angular'

@NgModule({
	declarations: [ImportPrivateKeyPage],
	imports: [IonicPageModule.forChild(ImportPrivateKeyPage)],
	exports: [IonicPageModule]
})
export class ImportPrivateKeyPageModule {}
