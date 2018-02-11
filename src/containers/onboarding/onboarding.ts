import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Slides } from 'ionic-angular'
import { trigger, state, style, animate, transition, keyframes } from '@angular/animations'
import { PossessionsPage } from "../possessions/possessions";

@IonicPage({
  name: 'Onboarding'
})
@Component({
  selector: 'page-onboarding',
  templateUrl: 'onboarding.html',
  animations: [
    trigger('bounce', [
      state('*', style({
        transform: 'translateX(0)'
      })),
      transition('* => rightSwipe', animate('700ms ease-out', keyframes([
        style({ transform: 'translateX(0)', offset: 0 }),
        style({ transform: 'translateX(-65px)', offset: 0.3 }),
        style({ transform: 'translateX(0)', offset: 1 })
      ]))),
      transition('* => leftSwipe', animate('700ms ease-out', keyframes([
        style({ transform: 'translateX(0)', offset: 0 }),
        style({ transform: 'translateX(65px)', offset: 0.3 }),
        style({ transform: 'translateX(0)', offset: 1 })
      ])))
    ])
  ]
})
export class OnboardingPage {
  @ViewChild(Slides) slides: Slides
  skipMsg: string = 'Skip'
  state: string = 'x'

  constructor(public navCtrl: NavController, public navParams: NavParams) {}

  slideMoved () {
    this.state =
      this.slides.getActiveIndex() >= this.slides.getPreviousIndex()
        ? 'rightSwipe'
        : 'leftSwipe'
  }

  animationDone () {
    this.state = 'x'
  }

  async skip () {
    await this.navCtrl.setRoot(PossessionsPage)
    await this.navCtrl.push(PossessionsPage)
  }

  slideChanged () {
    if (this.slides.isEnd()) {
      this.skipMsg = 'Alright! I got it'
    }
  }

}
