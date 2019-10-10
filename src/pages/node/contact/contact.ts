import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform } from 'ionic-angular';
import { Clipboard } from '@ionic-native/clipboard'
import { TranslateService } from '@ngx-translate/core'
import { NotificationProvider } from '../../../providers/notification.provider'

/**
 * Generated class for the NodeRulePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage({
  name: 'Contact',
  segment: 'contact'
})
@Component({
  selector: 'page-contact',
  templateUrl: 'contact.html',
})
export class ContactPage implements OnInit {

  private obj;
  constructor(public navCtrl: NavController, public navParams: NavParams,
    private ts: TranslateService,
    private clipboard: Clipboard,
    private platform: Platform,
    private np: NotificationProvider,
  ) {
  }

  ngOnInit() {
    this.obj = [
      { title: "SEA 官网", icon: "", value: "https://otcgo.cn" },
      { title: "SEA 微信客服 1", icon: "", value: "Andre_1119" },
      { title: "SEA 微信客服 2", icon: "", value: "LINCHEN2645614" },
      { title: "SEA QQ 客服 1", icon: "", value: "398974686" },
      { title: "SEA QQ 客服 2", icon: "", value: "649027008" },
      { title: "SEA Telegram", icon: "", value: "t.me/otcgo" }
    ]
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad NodeRulePage');
  }

  copy(value) {
    console.log('this.platform', this.platform)
    // console.log('element', element)
    if (this.platform.is('mobileweb')) {
      try {
        const el = document.createElement('textarea')
        el.value = value
        document.body.appendChild(el)
        el.select()
        document.execCommand('copy')
        document.body.removeChild(el)

        return this.np.emit({ message: `copy successful` })
      } catch (err) {
        console.log('unable to copy', err)
      }
    }

    let copyText
    this.ts.get('CW.BACKUP.success').subscribe(data => {
      copyText = data
    })


    this.clipboard.copy(value).then(() => this.np.emit({ message: copyText })).catch()
  }

}
