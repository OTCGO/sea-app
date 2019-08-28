import { Component, OnInit } from '@angular/core'
import { Store } from '@ngrx/store'
import {
    IonicPage,
    NavController,
    NavParams
} from 'ionic-angular'
import { MenuService } from '../../shared/services'
// import { Wechat } from '@ionic-native/wechat/ngx';

declare var Wechat: any;

@IonicPage({
    name: 'Node',
    segment: 'node'
})
@Component({
    selector: 'page-node',
    templateUrl: 'node.html',
})

export class NodePage implements OnInit {

    constructor(private navCtrl: NavController, private menuService: MenuService,
    ) {

    }
    ngOnInit() {
        // Wechat.isInstalled().then(() => {

        // }).catch(() => {

        // });
    }
    gotoJoin() {
        console.log('handleJoin')
        this.navCtrl.push("Join")
    }

    gotoPick() {
        this.navCtrl.push("NodePick")
    }

    gotoStatus() {
        this.navCtrl.push("NodeStatus")
    }

    handleMenu() {
        this.menuService.sendMessage("change")
    }

    share() {
        console.log('share')
        Wechat.share({
            text: "这是分享的标题",
            scene: Wechat.Scene.TIMELINE
        }, function () {
            alert("Success");
        }, function (reason) {
            alert("Failed: " + reason);
        });
    }
}