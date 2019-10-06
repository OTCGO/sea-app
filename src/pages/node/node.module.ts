import { NgModule } from '@angular/core'
import { NodePage } from './node'
import { IonicPageModule } from 'ionic-angular'
import { TranslateModule } from '@ngx-translate/core'
import { NodeMenuComponent } from '../../components/node-menu/node-menu'
import { NodeHeaderComponent } from '../../components/node-header/node-header'
import { SuccessAlertComponent } from '../../components/success-alert/success-alert'
import { ShareAlertComponent } from '../../components/share-alert/share-alert'
import { RouterProvider, AccountProvider, ApiProvider, WalletProvider } from '../../providers'


const COMPONENTS = [
    NodePage,
    NodeMenuComponent,
    SuccessAlertComponent,
    NodeHeaderComponent,
    ShareAlertComponent
]


@NgModule({
    imports: [
        IonicPageModule.forChild(NodePage),
        TranslateModule.forChild(),
    ],
    providers: [AccountProvider],
    declarations: COMPONENTS,
    exports: COMPONENTS,
    entryComponents: [SuccessAlertComponent]
})
export class NodePageModule { }

