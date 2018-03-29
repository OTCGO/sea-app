import { Component } from '@angular/core'
import { IonicPage, NavParams } from 'ionic-angular'
import { mockResponse } from './mockdata'
import * as d3 from 'd3'

console.log(mockResponse)

@IonicPage({
	name: 'MarketDetail',
	segment: 'market-detail'
})
@Component({
	selector: 'page-market-detail',
	templateUrl: 'market-detail.html'
})

export class MarketDetailPage {
	coin = this.navParams.data.coin
	perGas = this.navParams.data.perGas
	histories = mockResponse.Data

	get width () {
		return window.innerWidth
	}

	constructor (public navParams: NavParams) {}

	ngOnInit () {
		const h = 100

		const closeData = this.histories.map((d: any) => d.close)
		const minClose = closeData.reduce((acc, cur) => Math.min(acc, cur))
		const maxClose = closeData.reduce((acc, cur) => Math.max(acc, cur))
		const sortedTimeData = this.histories
															 .map((d: any) => new Date(d.time))
															 .sort((pre, cur) => pre.getTime() - cur.getTime())
															 .map(d => d.getTime())
		const minTime = sortedTimeData[0]
		const maxTime = sortedTimeData[sortedTimeData.length - 1]

		const svg = d3.select('.market-detail__chart svg')
									.attr('height', h)
									.attr('width', this.width)
									.append('g')

		const xScale = d3.scaleTime()
										 .range([0, this.width])
										 .domain([minTime, maxTime])
		const yScale = d3.scaleLinear().range([h, 0])
										 .domain([minClose, maxClose])

		const lineGen = d3.line()
											.x((d: any) => xScale(d.time))
											.y((d: any) => yScale(d.close))
											.curve(d3.curveBasis)

		svg.append('path')
			 .data([this.histories])
			 .attr('d', lineGen(this.histories))
			 .attr('stroke', 'steelblue')
			 .attr('stroke-width', 3)
			 .attr('fill', 'none')
	}
}
