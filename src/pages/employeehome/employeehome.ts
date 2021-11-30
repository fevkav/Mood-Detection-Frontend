import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {VotingComponent} from "../../components/voting/voting";
import {EmployeeChartComponent} from "../../components/employee-chart/employee-chart";

/**
 * Generated class for the EmployeehomePage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-employeehome',
  templateUrl: 'employeehome.html',
})
export class EmployeehomePage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  gotoVoting() {
    this.navCtrl.push(VotingComponent);
  }

  gotoMyMoods() {
    this.navCtrl.push(EmployeeChartComponent);
  }
}
