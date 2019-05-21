import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { StatsLineChart } from '../../assets/data/data';

import * as d3 from 'd3-selection';
import * as d3Scale from 'd3-scale';
import * as d3Array from 'd3-array';
import * as d3Axis from 'd3-axis';
import * as d3Shape from 'd3-shape';

@Component({
  selector: 'app-line-chart',
  encapsulation: ViewEncapsulation.None, // IMPORTANT! Otherwise it's not a line chart
  templateUrl: './line-chart.page.html',
  styleUrls: ['./line-chart.page.scss'],
})
export class LineChartPage implements OnInit {
  title = 'D3 Linechart with Ionic 4';

  private margin = {top: 20, right: 20, bottom: 30, left: 50};
  private width: number;
  private height: number;
  private x: any;
  private y: any;
  private svg: any;
  private g: any;
  private line: d3Shape.Line<[number, number]>;

  constructor() {
    this.width = 900 - this.margin.left - this.margin.right;
    this.height = 500 - this.margin.top - this.margin.bottom;
  }

  ngOnInit() {
    this.initSvg();
    this.initAxis();
    this.drawAxis();
    this.drawLine();
  }

  initSvg() {
    this.svg = d3.select('#lineChart')
      .append('svg')
      .attr('width', '100%')
      .attr('height', '100%')
      .attr('viewBox', '0 0 900 500');

    this.g = this.svg.append('g')
      .attr('transform', 'translate(' + this.margin.left + ',' + this.margin.top + ')');
  }

  initAxis() {
    this.x = d3Scale.scaleTime().rangeRound([0, this.width]);
    this.y = d3Scale.scaleLinear().rangeRound([this.height, 0]);
    this.x.domain(d3Array.extent(StatsLineChart, (d) => d.date ));
    // this.y.domain(d3Array.extent(StatsLineChart, (d) => d.value ));
    this.y.domain([0, d3Array.max(StatsLineChart, (d) => d.value)]);
  }

  drawAxis() {
    this.g.append('g')
      .attr('class', 'axis axis--x')
      .attr('transform', 'translate(0,' + this.height + ')')
      .call(d3Axis.axisBottom(this.x));

    this.g.append('g')
        .attr('class', 'axis axis--y')
        .call(d3Axis.axisLeft(this.y))
        .append('text')
        .attr('class', 'axis-title')
        .attr('transform', 'rotate(-90)')
        .attr('y', 6)
        .attr('dy', '.71em')
        .style('text-anchor', 'end')
        .text('Price ($)');
  }

  drawLine() {
    this.line = d3Shape.line()
      .x( (d: any) => this.x(d.date) )
      .y( (d: any) => this.y(d.value) );

    this.g.append('path')
        .datum(StatsLineChart)
        .attr('class', 'line')
        .attr('d', this.line);
  }
}
