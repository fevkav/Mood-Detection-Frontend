import {Component, OnInit} from '@angular/core';
import {AuthProvider} from "../../providers/auth";


@Component({
  selector: 'votelist',
  templateUrl: 'votelist.html'
})
export class VoteListComponent implements OnInit{

  private amountEmployees: number;
  private amountEmployeesWithVote: number;
  private amountVotes: number;

  private choosenWeek: number = 0;

  averageChartLabels: Array<number> = [];
  averageChartType: string = 'line';
  averageChartLegend: boolean = true;
  averageChartOptions: any = {
    scaleShowVerticalLines: false,
    responsive: true,
    scales: {
      yAxes: [{
        ticks: {/*min: 1, max: 5,*/}
      },]
    }


  };
  averageChartData: Array<any> = [
    {data: [], label: "" }
  ];

  public barChartOptions:any = {
    scaleShowVerticalLines: false,
    responsive: true
  };
  public barChartLabels: Array<number> = [];
  public barChartType: string = 'bar';
  public barChartLegend: boolean = false;

  public barChartData: any[];

  public barChartColors:Array<any> = [
    {
      backgroundColor: 'rgba(37, 108, 34, 1)',
      borderColor: 'rgba(148,159,177,1)',
    },
    {
      backgroundColor: 'rgba(171, 207, 52, 1)',
      borderColor: 'rgba(148,159,177,1)',
    },
    {
      backgroundColor: 'rgba(250, 247, 40, 1)',
      borderColor: 'rgba(148,159,177,1)',
    },
    {
      backgroundColor: 'rgba(239, 134, 35, 1)',
      borderColor: 'rgba(148,159,177,1)',
    },
    {
      backgroundColor: "rgba(214, 30, 30, 1)",
      borderColor: 'rgba(148,159,177,1)',
    }
  ];

  // events
  public chartClicked(e:any):void {
    console.log(e);
  }

  public chartHovered(e:any):void {
    console.log(e);
  }


  constructor(private authService: AuthProvider) {}

  ngOnInit() {

    this.getAverageOfWeeks();
    this.getAmountVotes();
    this.getAmounts();
  };

  getAmountVotes() {

    this.barChartLabels.length = 0;

    this.barChartData = [{ data: [], label: "" }];

    this.authService.getAmountVotes(this.choosenWeek).subscribe(json => {


      let data: Array<number> = [];
      let amountVotes: number = 0;
      json.forEach(obj => {

        if(this.choosenWeek == 0) {
          this.barChartLabels.push(obj.calendarweek);
        }
        else {
          this.barChartLabels.push(obj.mood);
        }

        data.push(obj.amount);
        amountVotes += obj.amount;

      });
      this.amountVotes = amountVotes;
      console.log(this.amountVotes);

      this.barChartData = [
        { data: data, label: ''}
      ];

    });
  }

  private getAverageOfWeeks() {
    this.authService.getAverageOfWeeks()
      .subscribe(json => {
        let averages: Array<number> = [];
        json.forEach(average => {
          averages.push(average.average);
          this.averageChartLabels.push(average.calendarweek);
        });
        this.averageChartData = [
          { data: averages, label: 'Durchschnitt' }
        ];
      });
  }

  private getAmounts() {
    this.authService.getAmountEmployeesWithVotes().subscribe(array => {
      this.amountEmployees = array[0];
      this.amountEmployeesWithVote = array[1];
    });

  }

}
