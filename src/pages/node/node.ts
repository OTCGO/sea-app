import { Component, OnInit } from '@angular/core'
import { Store } from '@ngrx/store'
import {
    IonicPage,
    NavController,
    NavParams
} from 'ionic-angular'

@IonicPage({
    name: 'Node',
    segment: 'node'
})
@Component({
    selector: 'page-node',
    templateUrl: 'node.html',
})

export class NodePage implements OnInit {

    constructor(public navCtrl: NavController, ) {

    }
    ngOnInit() {

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
}