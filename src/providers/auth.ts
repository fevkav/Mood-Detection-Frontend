import { Injectable } from '@angular/core';
import {Storage} from "@ionic/storage";
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import {ReplaySubject} from "rxjs/ReplaySubject";
import {AuthHttp, JwtHelper} from "angular2-jwt";
import {SERVER_URL} from "../config";

/**
 * Diese Klasse kümmert sich um alle Anfragen an den Webservice. Bei Anfragen, wo eine Authentifizierung von Nöten ist,
 * wird die AuthHttp Klasse benutzt. Zusätzlich wird hier das Speichern und Löschen eines Anmelde-Tokens geregelt.
 */
@Injectable()
export class AuthProvider {

  readonly storageKey: string = "jwt";

  authUser = new ReplaySubject<any>(1);

  constructor(private http: Http,
              private authHttp: AuthHttp,
              private storage: Storage,
              private jwtHelper: JwtHelper) {
  }

  /**
   * Überprüft ob es ein Token im local Storage existiert und ob dieser auch valide ist. Ensprechend des Tokens wird
   * die zugehörige Startseite gezeigt.
   */
  check() {

    /* Auskommentieren um Token zu löschen.*/
    // this.storage.remove(this.storageKey);

    this.storage.get(this.storageKey).then(jwt => {


      if (jwt && !this.jwtHelper.isTokenExpired(jwt)) {

        // prüfe, ob man mit dem JWT ein Endpunkt nur für Manager aufrufen kann
        this.authHttp.get(`${SERVER_URL}/authmanager`)

        // falls ja, rufe Homepage für Manager auf
          .subscribe(() => this.authUser.next("Manager"),

            // falls nicht, prüfe ob man mit dem JWT ein Endpunkt nur für Employees aufrufen kann
            (error => this.authHttp.get(`${SERVER_URL}/authemployee`)

            // falls ja, rufe Homepage für Employees auf
              .subscribe(() => this.authUser.next("Employee"),

                // falls nicht, ist JWT fehlerhaft. Gehe zur Seite um JWT zu holen (Registrieren oder Einlogen)
                (error => this.storage.remove(this.storageKey).then(() => this.authUser.next(null))))));
      }
      else {
        console.log(`Kein Token gefunden. ${jwt}`)
        this.storage.remove(this.storageKey).then(() => this.authUser.next(null));
      }
    });
  }

  /**
   *
   * @return {Observable<any>}
   */
  getManagers() {
    return this.http.get(`${SERVER_URL}/managers`)
      .map(response => response.json());
  }

  register(id: any) {
    return this.http.post(`${SERVER_URL}/register`, id)
      .map(response => response.text())
      .map(jwt => this.handleJwtResponse(jwt));
  }

  login(loginData: any) {
    return this.http.post(`${SERVER_URL}/login`, loginData)
      .map(response => response.text())
      .map(jwt => this.handleJwtResponse(jwt));
  }

  logout() {
    this.storage.remove(this.storageKey).then(() => this.authUser.next(null));
  }

  private handleJwtResponse(jwt: string) {
    return this.storage.set(this.storageKey, jwt)
      .then(() => this.check()/*console.log(`JWT: ${jwt}`)*/)    //check()
      .then(() => jwt);
  }

  getCurrentCalendarWeek() {
    return this.authHttp.get(`${SERVER_URL}/currentweek`)
      .map(response => response.json());
  }

  getAmountVotes(week: number) {
    return this.authHttp.get(`${SERVER_URL}/votes/amount?week=${week}`)
      .map(responseData => responseData.json());
  }

  getAverageOfWeeks() {
    return this.authHttp.get(`${SERVER_URL}/votes/avg`)
      .map(responseData => responseData.json());
  }


  postMood(mood: any) {
    return this.authHttp.post(`${SERVER_URL}/voting`, mood);
  }

  getEmployeeVotes() {
    return this.authHttp.get(`${SERVER_URL}/votestatus`)
      .map(response => response.json());
  }

  getAmountEmployeesWithVotes() {
    let array: number[] = [];
    return this.authHttp.get(`${SERVER_URL}/managers/employees`)
      .map(response => response.json())
  }

}
