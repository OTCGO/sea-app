import { Component, OnInit, ViewChild } from '@angular/core'
import { IonicPage, Tabs } from 'ionic-angular'
import { TranslateService } from '@ngx-translate/core'


@IonicPage({
  name: 'Tabs',
  segment: 'tabs'
})
@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage implements OnInit {
  selectedIndex = 1
  tabs: any[]

  @ViewChild('ionTabs') tabRef: Tabs

  private balancesTitle = 'possessions'
  // private marketsTitle = 'markets'
  // private discoverTitle = 'discover'
  private profileTitle = 'profile'

  constructor(private trs: TranslateService) { }

  ngOnInit() {
    this.tabs = [
      { root: 'Possessions', title: this.balancesTitle, icon: 'balances', enabled: true },
      // { root: 'Markets', title: this.marketsTitle, icon: 'markets', enabled: true },
      // { root: 'Discover', title: this.discoverTitle, icon: 'discover', enabled: false },
      { root: 'Node', title: "node", icon: 'profile', enabled: true },
      { root: 'Profile', title: this.profileTitle, icon: 'profile', enabled: true }
    ]

    this.trs.onLangChange.subscribe(() => this.selectTab())
  }

  selectTab() {
    const selectedTab = this.tabRef.getSelected()
    this.tabRef.getAllChildNavs().forEach(tab => {
      this.trs.get('TABS')
        .subscribe(
          TBAS => tab.tabTitle = (tab === selectedTab)
            ? ''
            : TBAS[this[tab.tabIcon + 'Title']]
        )
    })
  }
}
