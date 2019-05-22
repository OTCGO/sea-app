import { Component, OnInit } from '@angular/core'
import { AlertController } from 'ionic-angular'
import { VersionProvider } from './version.provider'
import { version } from '../../environments/environment'
// import { RootState } from '../../store/reducers'
// import { Store } from '@ngrx/store'
// import { VersionActions } from '../../store/actions'
// import { Version } from '../../shared/models'
// import { VersionSelectors } from '../../store/selectors'
// import { Observable } from 'rxjs/Observable'
import { TranslateService } from '@ngx-translate/core'
import { Platform } from 'ionic-angular'
import { InAppBrowser } from '@ionic-native/in-app-browser'
import { Globalization } from '@ionic-native/globalization'

/**
 * Generated class for the VersionComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'version',
  templateUrl: 'version.html'
})
export class VersionComponent implements OnInit {

  // private version: Observable<Version>
  constructor(private alertCtrl: AlertController,
    // private store: Store<RootState>,
    private ts: TranslateService,
    private platform: Platform,
    private iab: InAppBrowser,
    private versionProvider: VersionProvider,
    private globalization: Globalization, ) {

  }

  async ngOnInit() {
    try {

      console.log('ngOnInit')
      // this.platform.is('ios')

      // const v = new Version()
      //  v.platform = this.platform.is('ios') ? 'ios' : 'android'
      // this.store.dispatch(new VersionActions.Load(v))

      // this.version = this.store.select(VersionSelectors.getEntities)


      //  console.log('this.platform', this.platform)

      let syslan = { value: 'zh' }
      try {
        syslan = (await this.globalization.getPreferredLanguage()) || { value: 'zh' }
      } catch (error) {
        syslan = { value: 'zh' }
      }

      const locale = syslan.value.split('-')[0]

      //console.log('platform', this.platform.is('ios'))
      const result = (await this.versionProvider.getVersion(this.platform.is('ios') ? 'ios' : 'android')).version

      //console.log('result', JSON.stringify(result))
      if (result && result.version !== version) {

        let title
        this.ts.get('VERSION.title').subscribe(data => {
          title = data
        })

        let cancle
        this.ts.get('VERSION.cancle').subscribe(data => {
          cancle = data
        })

        let confirm
        this.ts.get('VERSION.confirm').subscribe(data => {
          confirm = data
        })

        const alert = this.alertCtrl.create({
          title: `${title} ${result.version}`,
          // subTitle: locale === 'zh' ? result.update_notes_zh : result.update_notes_en,
          // message: `
          // <ul class='update'>
          //   <li>1.Charming Victoria in the Mission</li>
          //   <li>2.Cosy 2BD with Parking Included</li>
          //   <li>3.Amazing View from a Mordern Loft</li>
          // </ul>
          // `,
          message: locale === 'zh' ? result.update_notes_zh : result.update_notes_en,
          buttons: [{
            text: cancle,
            handler: data => {
              console.log('Cancel clicked')
            }
          },
          {
            text: confirm,
            handler: data => {
              console.log('Saved clicked')
              this.iab.create(result.download_url, '_system')
            }
          }]
        })

        alert.present().catch()
      }

      /*
      this.version.subscribe(result => {



        if (result) {
          console.error('result', result)

          console.error('result.isDisplay', result.isDisplay)
          console.error('version', result.version !== version)
        }




        if (result && !(result.isDisplay) && result.version !== version) {


          // console.error('result.isDisplay', result)

          let title
          this.ts.get('VERSION.title').subscribe(data => {
            title = data
          })

          let cancle
          this.ts.get('VERSION.cancle').subscribe(data => {
            cancle = data
          })

          let confirm
          this.ts.get('VERSION.confirm').subscribe(data => {
            confirm = data
          })

          const alert = this.alertCtrl.create({
            title: `${title}${result.version}`,
            subTitle: locale === 'zh' ? result.update_notes_zh : result.update_notes_en,
            buttons: [{
              text: cancle,
              handler: data => {
                console.log('Cancel clicked')
              }
            },
            {
              text: confirm,
              handler: data => {
                console.log('Saved clicked')
                this.iab.create(result.download_url)
              }
            }]
          })

          alert.present().catch()

          // result.isDisplay = true
          // this.store.dispatch(new VersionActions.LoadDisplay(result))

        }


      })*/
    } catch (error) {
      console.log('VersionComponent', error)
    }

  }

}
