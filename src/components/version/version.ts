import { Component, OnInit } from '@angular/core'
import { AlertController } from 'ionic-angular'
import { VersionProvider } from './version.provider'
import { version } from '../../environments/environment'
import { RootState } from '../../store/reducers'
import { Store } from '@ngrx/store'
import { VersionActions } from '../../store/actions'
import { Version } from '../../shared/models'
import { VersionSelectors } from '../../store/selectors'
import { Observable } from 'rxjs/Observable'
import { TranslateService } from '@ngx-translate/core'
import { Platform } from 'ionic-angular'
import { InAppBrowser } from '@ionic-native/in-app-browser'

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

  private version: Observable<Version>
  constructor(private alertCtrl: AlertController,
     private store: Store<RootState>,
     private ts: TranslateService,
     private platform: Platform,
     private iab: InAppBrowser, ) {

  }

  async ngOnInit() {
    try {

      this.platform.is('ios')

      const v = new Version()
      v.platform = this.platform.is('ios') ? 'ios' : 'android'
      this.store.dispatch(new VersionActions.Load(v))

      this.version = this.store.select(VersionSelectors.getEntities)

      this.version.subscribe(result => {
        console.log('data', result)


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
            title: `${title}${result.version}`,
            subTitle: result.update_notes,
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
          alert.present()
        }

      })
    } catch (error) {
      console.log('VersionComponent', error)
    }

  }

}
