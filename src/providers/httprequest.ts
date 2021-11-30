import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

@Injectable()
export class HttprequestProvider {

  private baseUrl: string = "http://localhost:8080/vote/";

  constructor(private http: Http) {}

  public createStatistics(){

    return new Promise(resolve => {

      this.http.get(this.baseUrl).subscribe(data => resolve(data.json()));

    });


  }
}
