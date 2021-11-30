/**
 * Der zweite Kernbestandteil einer Angular-Komponente, das Applikationsmodul. Hier wird das Applikationsmodul
 * konfiguriert.
 */

import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import {Http, HttpModule, RequestOptions} from "@angular/http";
import {VotingComponent} from "../components/voting/voting";
import {VoteListComponent} from "../components/votelist/votelist";
import {IonicStorageModule, Storage} from "@ionic/storage";
import { ChartsModule} from "ng2-charts";
import {AuthConfig, AuthHttp, JwtHelper} from "angular2-jwt";
import {CustomFormsModule} from "ng2-validation";
import { AuthProvider } from '../providers/auth';
import {LoginPage} from "../pages/login/login";
import {FirstTimePage} from "../pages/first-time/first-time";
import {RegisterPage} from "../pages/register/register";
import {EmployeehomePage} from "../pages/employeehome/employeehome";
import {EmployeeChartComponent} from "../components/employee-chart/employee-chart";

/**
 * JSON Web Tokens werden üblicherweise in dem HTTP-Header mitversendet. Mithilfe der Bibliothek "angular2-jwt" wird
 * dies automatisch bei jedem HTTP-Request für uns geregelt. Dafür nutzen wir die "AuthHttp" Klasse, statt HTTP.
 *
 * Standardmäßig liest die Bibliothek aus dem LocalStorage mit dem key "id_token". Um aber den nativen Storage
 * zu nutzen mit beliebigem Key, wird die Bibliothek mit der folgeden Methode konfiguriert.
 *
 * @param {Http} http
 * @param {RequestOptions} options
 * @param {Storage} storage
 * @return {AuthHttp}
 */
export function authHttpServiceFactory(http: Http, options: RequestOptions, storage: Storage) {
  const authConfig = new AuthConfig({
    tokenGetter: (() => storage.get('jwt')),
  });
  return new AuthHttp(authConfig, http, options);
}



/*
  @NgModule = deklarative Konfiguration eines Angular-Moduls.
 */
@NgModule({
  declarations: [         //Alle hier aufgeführten Komponenten sind im gesamten Applikationsmodul sichtbar und können
    MyApp,                //von jeder anderen Komponente verwendet werden, die hier deklariert wird.
    HomePage,
    VotingComponent,
    VoteListComponent,
    LoginPage,
    FirstTimePage,
    RegisterPage,
    EmployeehomePage,
    EmployeeChartComponent
  ],
  imports: [              //um die Funktionalität des Browsers verwenden zu können, z.B. um ein DOM-Baum zu rendern.
    BrowserModule,
    HttpModule,
    ChartsModule,         // Bibliothek für Diagramme
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot({
      name: "myapp",
      driverOrder: ["sqlite", "indexeddb", "websql"]
    }),
    CustomFormsModule     // Bibliothek zur Form-Validierung

  ],
  bootstrap: [IonicApp],  //Einstiegskomponente
  entryComponents: [
    MyApp,
    HomePage,
    LoginPage,
    FirstTimePage,
    RegisterPage,
    EmployeehomePage,
    VotingComponent,
    VoteListComponent,
    EmployeeChartComponent
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    JwtHelper, {
    provide: AuthHttp,
    useFactory: authHttpServiceFactory,
    deps: [Http, RequestOptions, Storage]
    },
    AuthProvider
  ]
})
export class AppModule {}
