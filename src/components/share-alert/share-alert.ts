import { Component } from '@angular/core';
import { ToastController } from 'ionic-angular';
import { Wechat } from '@ionic-native/wechat/ngx';

/**
 * Generated class for the ShareAlertComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'share-alert',
  templateUrl: 'share-alert.html'
})
export class ShareAlertComponent {

  constructor(private wechat: Wechat, private toastCtrl: ToastController) {

  }

  // 分享好友
  async wechatShare() {


    try {
      this.showNotification('share')
      await this.wechat.isInstalled();

      await this.wechat.share({
        message: {
          text: "SEAC STAGING 节点计划正常启动",
          description: "节点计划正常启动",
          thumb: "https://otcgo.cn/static/node/sea-app-post.png"

        },
        scene: this.wechat.Scene.SESSION   // share to Timeline
      });


      this.showNotification('分享成功')

    } catch (error) {

      this.showNotification(error)

    }

  }


  async checkWechatisInstalled() {
    const result = await this.wechat.isInstalled();
    this.showNotification(result)

  }

  // 分享好友
  async wechatFriendShare() {
    // await this.wechat.isInstalled();


    try {
      await this.checkWechatisInstalled()
      await this.wechat.share({
        message: {
          text: "SEAC STAGING 节点计划正常启动",
          description: "节点计划正常启动",
          thumb: "https://otcgo.cn/static/node/sea-app-post.png"

        },
        scene: this.wechat.Scene.TIMELINE   // share to Timeline
      });


      this.showNotification('分享成功')

    } catch (error) {

      this.showNotification('分享失败')

    }

  }

  showNotification(message) {
    this.toastCtrl.create({
      message,
      duration: 3000,
      position: 'bottom'
    }).present();;
  }
}
