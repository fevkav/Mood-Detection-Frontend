/**
 * Kernbestandteil einer Angular-Komponente, die Komponenten-Logik. Diese kann wiederum aus weiteren Komponenten bestehen.
 */

import { Component } from '@angular/core';          //ist ein Beispiel für ein ECMAScript-Modul (Version?), genaueres siehe Literatur.
import { HomePage } from '../pages/home/home';
import {AuthProvider} from "../providers/auth";
import {FirstTimePage} from "../pages/first-time/first-time";
import {EmployeehomePage} from "../pages/employeehome/employeehome";

/**
 * der Decorator (@Component), der die Konfiguration und die Anmeldung der Komponente  beim Angular-Framework übernimmt.
 * Mithilfe von Decorators können Sie Ihre Klassen um zusätzliche Informationen - sogenannte Meta-Daten - erweitern.
 */
@Component({

  selector: 'myapp',
  templateUrl: 'app.html'
})

/**
 * Der eigentliche Komponenten-Code, der durch eine TypeScript-Klasse repräsentiert wird.
 */
export class MyApp {

  rootPage: any = null;
  constructor(authProvider: AuthProvider) {
    // entscheided, welche Page als Root gesetzt werden soll
    authProvider.authUser.subscribe(navigate => {
      // hier zur Manager Homepage navigieren
      if (navigate == "Manager") {
        this.rootPage = HomePage;
      }
      // hier zur Mitarbeiter Homepage navigieren
      else if (navigate == "Employee") {
        this.rootPage = EmployeehomePage;
      }
      else {
        // JWT nicht vorhanden oder expired oder fehlerhaft oder logout
        // => navigiere zur Auswahl-Page, d.h. Mitarbeiter registrieren/Manager einloggen
        this.rootPage = FirstTimePage;
      }
    });
    authProvider.check();
  }
}

