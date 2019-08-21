import { NgModule } from '@angular/core'
import { NodePage } from './node'
import { IonicPageModule } from 'ionic-angular'
import { TranslateModule } from '@ngx-translate/core'
import { NodeMenuComponent } from '../../components/node-menu/node-menu'

const COMPONENTS = [
    NodePage,
    NodeMenuComponent
]


@NgModule({
    imports: [
        IonicPageModule.forChild(NodePage),
        TranslateModule.forChild(),
    ],
    declarations: COMPONENTS,
})
export class NodePageModule { }

