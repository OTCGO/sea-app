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
    handleJoin() {
        console.log('handleJoin')
        this.navCtrl.push("Join")
    }
}