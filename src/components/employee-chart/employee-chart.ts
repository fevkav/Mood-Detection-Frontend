import {Component, OnInit} from '@angular/core';
import {AuthProvider} from "../../providers/auth";

@Component({
  selector: 'employee-chart',
  templateUrl: 'employee-chart.html'
})
export class EmployeeChartComponent implements OnInit{
  chartType: string = 'line';

  chartLegend: boolean = false;
  chartOptions: any = {
    scaleShowVerticalLines: false,
    responsive: true
  };
  chartLabels: Array<number> = [];

  chartData: Array<any> = [
    { data: [], label: "" }
  ];
  constructor(private authService: AuthProvider) {}

  ngOnInit() {
    this.fillChart();
  }

  private fillChart() {
    this.authService.getEmployeeVotes().subscribe(json => {
      let moods: Array<number> = [];
      json.forEach(mood => {
        moods.push(mood.mood);
        this.chartLabels.push(mood.calendarweek);
      });
      this.chartData = [
        { data: moods, label: 'Stimmen' }
      ];
    });
  }
}
