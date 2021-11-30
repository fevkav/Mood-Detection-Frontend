/**
 * Diese Komponente soll die abgegebenen Stimmen (zunächst) in Form einer Liste ausgeben.
 */
import { Component } from '@angular/core';
import {HttprequestProvider} from "../../providers/httprequest";

@Component({
  selector: 'page-statistics',
  templateUrl: 'statistics.html',
})
export class StatisticsPage {

  /**
   * Enthält die Testdaten für die Stimmen.
   */
  public moods: any;

  constructor(private http: HttprequestProvider) {}

  public onClickButton() {

    this.http.createStatistics().then(data => this.moods = data).catch(error => console.log(error));

}

}
