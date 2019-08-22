import { NgModule } from '@angular/core'
import { NodePage } from './node'
import { IonicPageModule } from 'ionic-angular'
import { TranslateModule } from '@ngx-translate/core'
import { NodeMenuComponent } from '../../components/node-menu/node-menu'
import { NodeHeaderComponent } from '../../components/node-header/node-header'

const COMPONENTS = [
    NodePage,
    NodeMenuComponent,
    NodeHeaderComponent
]


@NgModule({
    imports: [
        IonicPageModule.forChild(NodePage),
        TranslateModule.forChild(),
    ],
    declarations: COMPONENTS,
    exports: [
        NodeMenuComponent
    ]
})
export class NodePageModule { }

