import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the PriceChartPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

declare var echarts: any

@IonicPage({
  name: 'PriceChart',
  segment: 'price-chart'
})
@Component({
  selector: 'page-price-chart',
  templateUrl: 'price-chart.html',
})
export class PriceChartPage implements OnInit {

  @ViewChild('EchartsSEAC') containerC: ElementRef;//与html中div #container1对应
  EChartC: any;

  @ViewChild('EchartsSEAS') containerS: ElementRef;//与html中div #container1对应
  EChartS: any;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PriceChartPage');
  }

  ngOnInit() {
    var data = [];
    for (var i = 0; i <= 360; i++) {
      var t = i / 180 * Math.PI;
      var r = Math.sin(2 * t) * Math.cos(2 * t);
      data.push([r, i]);
    }


    this.EChartC = echarts.init(this.containerC.nativeElement, 'light');


    this.EChartS = echarts.init(this.containerS.nativeElement, 'light');

    const option = {
      xAxis: {
        type: 'category',
        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        axisLine: {
          lineStyle: {
            color: "white",
            width: 2
          }
        },

      },
      yAxis: {
        type: 'value',
        axisLine: {
          lineStyle: {
            color: "white",
            width: 2
          }
        },
      },
      series: [{
        data: [820, 932, 901, 934, 1290, 1330, 1320],
        type: 'line'
      }],
      tooltip: {
        trigger: 'axis'
      },
    }

    this.EChartC.setOption(option);

    this.EChartS.setOption(option);




  }
}
