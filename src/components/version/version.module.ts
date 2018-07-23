import { NgModule } from '@angular/core'
import { IonicModule } from 'ionic-angular'
import { TranslateModule } from '@ngx-translate/core'

import {
    VersionComponent,
} from './version'

const COMPONENTS = [
    VersionComponent,
]

// TODO(Amagi): Using IonicModule may be become a huge cost right there, Optimize later
@NgModule({
    declarations: COMPONENTS,
    imports: [
        IonicModule,
        TranslateModule.forChild()],
    exports: COMPONENTS
})
export class VersionModule { }
