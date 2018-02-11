import { Component } from '@angular/core';
import { DiscoverPage } from '../discover/discover';
import { PossessionsPage } from '../possessions/possessions';
import { ProfilePage } from '../profile/profile'
import { MarketsPage } from '../markets/markets'
import { IonicPage } from 'ionic-angular'


@IonicPage()
@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {
  possessionsPage = PossessionsPage;
  marketsPage = MarketsPage
  discoverPage = DiscoverPage;
  profilePage = ProfilePage;

  constructor () { }
}
