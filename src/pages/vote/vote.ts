/**
 * Hier soll die Verarbeitung für das Abstimmen der Mitarbeiterstimmung realisiert werden.
 *
 */

import { Component } from '@angular/core';


@Component({
  selector: 'page-vote',
  templateUrl: 'vote.html',
})

export class VotePage {

  /**
   * Die Stimmung des Mitarbeiters.
   * Werte im Bereich der definierten ion-range, hier: 1-5
   */
  mood: any;

  /**
   * Zeigt die Stimmung als einen Text an.
   */
  moodInText: String;


  constructor() {
    this.mood = 0;
    this.moodInText = "noch nicht abgestimmt";  //Initialisierung der Stimmung
  }

  /**
   * Übersetzt die numerische Abstimmung in eine verständlichere Beschreibung der Stimmung.
   */
  schreibeMoodInText(){
    if (this.mood == 1){
      this.moodInText = "sehr schlecht";
    } else if (this.mood == 2){
      this.moodInText = "schlecht";
    } else if (this.mood == 3){
      this.moodInText = "durchschnittlich";
    } else if (this.mood == 4){
      this.moodInText = "gut";
    } else if (this.mood == 5){
      this.moodInText = "sehr gut";
    }
  }

  receiveMood(mood){
    console.log(`Du hast mit ${mood} abgestimmt.`)
  }

}



