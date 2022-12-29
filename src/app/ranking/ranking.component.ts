import { Component, OnInit, ViewChild } from '@angular/core';
import { RankingService } from './ranking.service';
import {
  ApexAxisChartSeries,
  ApexChart,
  ChartComponent,
  ApexDataLabels,
  ApexXAxis,
  ApexPlotOptions,
  ApexGrid,
  ApexTooltip,
  ApexYAxis
} from "ng-apexcharts";

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  dataLabels: ApexDataLabels;
  plotOptions: ApexPlotOptions;
  xaxis: ApexXAxis;
  yaxis: ApexYAxis;
  grid: ApexGrid,
  tooltip: ApexTooltip
};

@Component({
  selector: 'app-ranking',
  templateUrl: './ranking.component.html',
  styleUrls: ['./ranking.component.css']
})
export class RankingComponent implements OnInit{

  public chartOptions: ChartOptions;
  public data: any[] = [];

  constructor(private rankingService: RankingService) {
    this.chartOptions = {
      series: [
        {
          name: "basic",
          data: []
        }
      ],
      chart: {
        type: "bar",
        height: 700,
        width: 1200,
        fontFamily: 'Helvetica, Arial, sans-serif',
        foreColor: 'white'
      },
      plotOptions: {
        bar: {
          horizontal: true
        }
      },
      dataLabels: {
        enabled: true
      },
      xaxis: {
        categories: []
      },
      yaxis: {

      },
      grid: {
        show: false
      },
      tooltip: {
        theme: 'dark'
      }
    };
  }

  ngOnInit(): void {
    this.rankingService.getRanking().subscribe( (res: any[]) => {
      // sort
      for(let i = 0; i < res.length; i++) {
        res[i]['pos'] = i+1;
      }
      this.data = res.sort( (a, b) => parseInt(b['Gesamt erreichte Punke']) - parseInt(a['Gesamt erreichte Punke']));
      console.log(this.data);
      console.log(this.data.map( e => {
        return parseInt(e['Gesamt erreichte Punke'])
      }));
      this.chartOptions = {
        series: [
          {
            name: "",
            data: this.data.map( e => {
              return {
                x: e['Name des Haushalts'],
                y: parseInt(e['Gesamt erreichte Punke']),
                goals: [
                  {
                    name: 'Betrunkenheit',
                    value: e['pos'],
                    strokeWidth: 5,
                    strokeHeight: 10,
                    strokeColor: '#775DD0'
                  }
                ]
              }
            })
          }
        ],
        chart: {
          type: "bar",
          width: 1200,
          fontFamily: 'Helvetica, Arial, sans-serif',
          foreColor: 'white',
        },
        plotOptions: {
          bar: {
            horizontal: true
          }
        },
        dataLabels: {
          enabled: true
        },
        xaxis: {
          labels: {
            style: {
              colors: [],
              fontSize: '16px',
              fontFamily: 'Helvetica, Arial, sans-serif',
              fontWeight: 400,
            },
          }
        },
        yaxis: {
          labels: {
            style: {
              colors: [],
              fontSize: '12px',
              fontFamily: 'Helvetica, Arial, sans-serif',
              fontWeight: 400,
            },
          }
        },
        grid: {
          show: false
        },
        tooltip: {
          theme: 'light'
        }
      };
    })
  }

}
