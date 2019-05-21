import { Component, OnInit } from '@angular/core';
import { Countries } from '../../assets/data/countries';

import * as d3 from 'd3-selection';
import * as d3Scale from 'd3-scale';
import * as d3Array from 'd3-array';
import * as d3Axis from 'd3-axis';
import * as d3Shape from 'd3-shape';

@Component({
  selector: 'app-treemap',
  templateUrl: './treemap.page.html',
  styleUrls: ['./treemap.page.scss'],
})
export class TreemapPage implements OnInit {
  title = 'D3 Treemap with Ionic 4';

  private margin = {top: 20, right: 20, bottom: 30, left: 50};
  private width: number;
  private height: number;
  private svg: any;
  private g: any;
  private treemap: d3Shape.treemap;

  constructor() {
    this.width = 900 - this.margin.left - this.margin.right;
    this.height = 500 - this.margin.top - this.margin.bottom;
  }

  ngOnInit() {
    this.initSvg();
    this.drawTreemap();
  }

  initSvg() {
  }

  drawTreemap() {
  }

}
