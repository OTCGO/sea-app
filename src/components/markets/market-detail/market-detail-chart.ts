import {
	Component,
	Input,
	OnInit
} from '@angular/core'

import * as d3 from 'd3'
import { DetailData } from '../../../shared/models/markets.model'
import { isEmpty } from '../../../shared/utils'

@Component({
	selector: 'market-detail-chart',
	templateUrl: 'market-detail-chart.html'
})
export class MarketDetailChart {
	@Input() gasPrice: number
	@Input() currentDuration: string

	@Input()
	get histories () { return this._histories }
	set histories (val) {
		this._histories = val
		!isEmpty(val) && this.renderChart()
	}
	private _histories

	get width () { return window.innerWidth }

	renderChart () {
		const height = 100
		const marginTop = 20
		const closeData = this.histories.map((d: any) => d.close)
		const minClose = closeData.reduce((acc, cur) => Math.min(acc, cur))
		const maxClose = closeData.reduce((acc, cur) => Math.max(acc, cur))
		const sortedTimeData = this.histories
															 .map((d: any) => new Date(d.time))
															 .sort((pre, cur) => pre.getTime() - cur.getTime())
															 .map(d => d.getTime())
		const minTime = sortedTimeData[0]
		const maxTime = sortedTimeData[sortedTimeData.length - 1]
		const container = d3.select('.market-detail__chart')
		container.select('.market-detail__chart svg').selectAll('g + g + g, rect').remove()
		const svg = container
									.select('svg')
									.attr('width', this.width)

		const group = svg.append('g').attr(
			'transform',
			`translate(0, ${marginTop + 30})`
		)

		const bisectDate = d3.bisector((d: DetailData) => d.time).left

		const xScale = d3.scaleTime()
										 .range([0, this.width])
										 .domain([minTime, maxTime])
		const yScale = d3.scaleLinear().range([height - 20, 0])
										 .domain([minClose, maxClose])

		const lineGen = d3.line()
											.x((d: any) => xScale(d.time))
											.y((d: any) => yScale(d.close))
											.curve(d3.curveBasis)

		group.append('path')
			 .data([this.histories])
			 .attr('d', lineGen(this.histories))
			 .attr('stroke', 'steelblue')
			 .attr('stroke-width', 3)
			 .attr('fill', 'none')

		var focus = group.append("g")
								 .attr("class", "focus")
								 .style("display", "none")

		focus.append("circle")
				 .attr("r", 7.5)
				 .style('filter', 'drop-shadow(-1px 0 7.5px rgba(0,0,0,0.3))')

		focus.append('text')
				 .attr('class', 'time')
				 .attr('x', -20)
				 .attr('dy', -20)

		svg.append("rect")
			 .attr("transform", `translate(0, ${marginTop})`)
			 .attr("class", "overlay")
			 .attr("width", this.width)
			 .attr("height", height)
			 .on("touchstart", function() { focus.style("display", null); })
			 .on('mouseenter', function() { focus.style("display", null); })
			 .on("touchend", function() { focus.style("display", "none"); })
			 .on("mouseout", function() { focus.style("display", "none"); })
			 .on("touchmove", mousemove(this, xScale, yScale))
			 .on("mousemove", mousemove(this, xScale, yScale))

		function mousemove (ng, x, y) {
			return function () {
				try {
					const x0: Date = xScale.invert(d3.mouse(this)[0])
					const	i = bisectDate(ng.histories, x0, 1)
					const d0 = ng.histories[i - 1]
					const d1 = ng.histories[i]
					const d: DetailData = (<any>x0 - d0.time) > (d1.time - <any>x0) ? d1 : d0
					const gasPrice = svg.select("text.gas-price").text(() => Number(ng.gasPrice) / d.close)
					const currency = svg.select('g + g > text')
					const time = new Date(d.time * 1000)
					const hourAndMinutes = formatTime(time, ng.currentDuration)
					focus.attr("transform", `translate(${x(d.time)}, ${y(d.close)})`)
					focus.select("text").text(() => hourAndMinutes)
					svg.select('text.gas-price + text').attr('dx', (<any>gasPrice)._groups[0][0].clientWidth)
					svg.select("text.current-price").attr('dx', (<any>currency)._groups[0][0].clientWidth).text(() => d.close)
				} catch (e) {
					return
				}
			}
		}
	}
}

function formatTime (time: Date, duration) {
	const day = time.getDate()
	const hour = time.getHours()
	const minutes = time.getMinutes()

	switch (duration) {
		case 'hour':
			return `${hour}:${minutes}`
		case 'day':
			return `${hour}:00`
		case 'month':
		case 'week':
			return `${ordinal(day)} ${hour}:00`
		default:
			return `${hour}:${minutes}`
	}
}

const ordinal = (i) => {
	switch (i) {
		case 1:
			return '1st';
		case 2:
			return '2nd';
		case 3:
			return '3rd';
		default:
			return `${i}th`; // NOTE won't get any much bigger ...
	}
}
