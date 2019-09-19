import { Component, OnInit } from '@angular/core';
import { MenuService } from '../../shared/services'

/**
 * Generated class for the NodeMenuComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'node-menu',
  templateUrl: 'node-menu.html'

})
export class NodeMenuComponent implements OnInit {
  private display: Boolean

  constructor(private menuService: MenuService) {

  }

  ngOnInit() {
    this.menuService.getMessage().subscribe(data => {
      console.log('NodeMenuComponent', data)
      // this.display = !this.display
      this.display = true;
    })
  }

}
