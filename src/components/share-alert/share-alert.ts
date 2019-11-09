import { Component, Output, EventEmitter } from '@angular/core';
import { ToastController, LoadingController, NavController } from 'ionic-angular';
import { File } from '@ionic-native/file';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';
import { PhotoLibrary } from '@ionic-native/photo-library';
import { Wechat } from '@ionic-native/wechat';

/**
 * Generated class for the ShareAlertComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */

// declare var Wechat: any;

@Component({
  selector: 'share-alert',
  templateUrl: 'share-alert.html'
})

export class ShareAlertComponent {


  @Output() cancleEvent = new EventEmitter<string>();

  //private wechat: Wechat,
  constructor(public loadingCtrl: LoadingController, private toastCtrl: ToastController,
    private transfer: FileTransfer, private file: File,
    private photoLibrary: PhotoLibrary,
    public navCtrl: NavController,
    private wechat: Wechat,
  ) {

  }

  async wechatShare(scene) {
    const loading = this.loadingCtrl.create({ showBackdrop: false });
    loading.present();
    // this.wechat.Type.IMAGE
    try {
      await this.wechat.share({
        message: {
          title: "SEAC STAGING 节点计划正常启动",
          description: "节点计划正常启动",
          thumb: "https://otcgo.cn/static/node/SEAC_Staking_thumb.jpg",
          media: {
            type: 4,
            image: "https://otcgo.cn/static/node/sea-app-post.png"
          }
        },
        scene: scene === 0 ? 0 : 1
      })

      // await this.wechat.share({
      //   text: "SEAC STAGING 节点计划正常启动",
      //   description: "节点计划正常启动",
      //   thumb: "https://otcgo.cn/static/node/SEAC_Staking_thumb.jpg",
      //   media: {
      //     type: 4,
      //     image: "https://otcgo.cn/static/node/sea-app-post.png"
      //   },
      //   scene: 0
      // })
    } catch (error) {
      // alert('error:' + error)
    } finally {
      loading.dismiss().catch();
    }
  }


  // 微信分享
  //   async wechatShare(scene) {
  //     const loading = this.loadingCtrl.create({ showBackdrop: false });
  //     loading.present();

  //     const self = this;
  //     try {
  //       // this.showNotification('share')


  //       /*

  //       Wechat.isInstalled(function (installed) {
  //         self.showNotification(installed)
  //         if (!installed) {
  //           self.showNotification('当前未安装微信')
  //           return
  //         }

  //         Wechat.share({
  //           message: {
  //             text: "SEAC STAGING 节点计划正常启动",
  //             description: "节点计划正常启动",
  //             thumb: "https://otcgo.cn/static/node/SEAC_Staking_thumb.jpg",
  //             media: {
  //               type: Wechat.Type.IMAGE,
  //               image: "https://otcgo.cn/static/node/sea-app-post.png"
  //             }
  //           },
  //           scene: scene === 0 ? Wechat.Scene.SESSION : Wechat.Scene.Timeline
  //         }, function () {
  //           self.showNotification('分享成功')
  //           // this.showNotification('分享成功')
  //         }, function (reason) {
  //           self.showNotification(reason)
  //         });
  //       }, function (reason) {
  //         self.showNotification(reason)
  //       });

  // */


  //     } catch (error) {



  //     } finally {
  //       loading.dismiss().catch();
  //     }

  //   }


  async download() {
    const loading = this.loadingCtrl.create({ showBackdrop: false });
    loading.present();


    try {

      await this.photoLibrary.requestAuthorization({ read: true, write: true })

      const fileTransfer: FileTransferObject = this.transfer.create();

      const url = 'https://otcgo.cn/static/node/sea-app-post.png';

      const entry = await fileTransfer.download(url, this.file.dataDirectory + 'sea-staking.png')
      // console.log('entry', JSON.stringify(entry));


      //  const url = 'https://otcgo.cn/static/node/sea-app-post.png';

      await this.photoLibrary.saveImage(entry.nativeURL, 'sea-app')

      this.showNotification('保存成功')

      // const url = 'https://otcgo.cn/static/node/sea-app-post.png';


    } catch (error) {
      console.log('error', error)
      this.showNotification('保存失败')
    } finally {
      loading.dismiss();
    }
  }

  cancleClickHandle() {
    console.log('cancleClickHandle')
    this.cancleEvent.emit('close');
  }

  showNotification(message) {
    this.toastCtrl.create({
      message,
      duration: 3000,
      position: 'bottom'
    }).present();;
  }
}
