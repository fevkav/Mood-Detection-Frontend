/*
  Der echte Start der Applikation durch die Übergabe des definierten Moduls an die Plattform, die verwendet werden soll.
  Angular übersetzt im Rahmen der Anwendung definierten HTML-Templates über einen eigenen Template-Compiler "on-the-fly"
 */
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app.module';

platformBrowserDynamic().bootstrapModule(AppModule);  //Start des Hauptmoduls
