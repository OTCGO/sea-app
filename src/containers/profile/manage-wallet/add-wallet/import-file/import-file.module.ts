import { NgModule } from '@angular/core'
import { IonicPageModule } from 'ionic-angular'
import { ImportFilePage } from './import-file'

@NgModule({
	declarations: [ImportFilePage],
	imports: [IonicPageModule.forChild(ImportFilePage)],
	exports: [ImportFilePage]
})
export class ImportFilePageModule {}