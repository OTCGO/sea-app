import { NgModule } from '@angular/core'
import { ImportSuccessPage } from './import-success'
import { IonicPageModule } from 'ionic-angular'

@NgModule({
	declarations: [ImportSuccessPage],
	imports: [IonicPageModule.forChild(ImportSuccessPage)],
	exports: [ImportSuccessPage]
})
export class ImportSuccessPageModule {}
