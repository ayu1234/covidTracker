import { Component, OnInit,AfterViewInit } from '@angular/core';
import { GetCovidStatsService } from '../service/get-covid-stats.service';
// import { Chart } from 'chart.js';
import * as Chart from 'chart.js'

@Component({
  selector: 'app-covid-chart',
  templateUrl: './covid-chart.component.html',
  styleUrls: ['./covid-chart.component.scss']
})
export class CovidChartComponent implements OnInit {
  chart;
  canvas;
  ctx;
  from = 0;
  currentState: string;
  constructor(private getCovidStatsService: GetCovidStatsService) { }

  ngOnInit(): void {
    this.canvas = document.getElementById('canvas');
    this.ctx = this.canvas.getContext('2d');
    this.currentState = 'Delhi';
    this.changeState(this.currentState);
    this.getCovidStatsService.numberFacts().subscribe((res:any) => {
      console.log(res)
    });
  }

  changeState(state) {
    this.currentState = state;
    this.getCovidStatsService.getReport().subscribe((res:any) => {
      this.from = state === 'Delhi' ?  60 : 100;
      let activeCases = res['cases_time_series'].map(data => Number(data.totalconfirmed) - Number(data.totalrecovered)).splice(this.from,20);
      let confirmedCases = res['cases_time_series'].map(data => data.totalconfirmed).splice(this.from,20);
      let alldates = res['cases_time_series'].map(data => data.date).splice(this.from,20);
      this.chart = new Chart(this.ctx, {
        type: 'line',
        data: {
          labels: alldates,
          datasets: [
            { 
              data: confirmedCases,
              borderColor: "#3cba9f",
              fill: false,
              label: 'Confirmed Cases'
            },
            { 
              data: activeCases,
              borderColor: "#ffcc00",
              fill: false,
              label: 'Active Cases'
            },
          ]
        },
        options: {
          legend: {
            display: true,
          },
          scales: {
            xAxes: [{
              display: true
            }],
            yAxes: [{
              display: true
            }],
          }
        }
      });    
    });
  }
}
