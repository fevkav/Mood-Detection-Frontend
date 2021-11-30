import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthProvider} from "../../providers/auth";

@Component({
  selector: 'voting',
  templateUrl: 'voting.html'
})
export class VotingComponent implements OnInit{
  private currentWeek: string;
  private currentMood: string;

  /**
   * Die Stimmung des Mitarbeiters.
   * Werte im Bereich der definierten ion-range, hier: 1-5
   */
  private mood: number;

  /**
   * Zeigt die Stimmung als einen Text an.
   */
  private moodInText: String;


  private formData: FormGroup;
  private showForm: boolean = true;


  constructor(private authProvider: AuthProvider,
              private formBuilder: FormBuilder) {

    this.moodInText = this.schreibeMoodInText(0);

    this.formData = this.formBuilder.group({
      mood: [, Validators.required]
    });
  }

  /**
   * Übersetzt die numerische Abstimmung in eine verständlichere Beschreibung der Stimmung.
   */
  private schreibeMoodInText(mood: number) {

    let moodInText: string;

    if (mood == 0)
      moodInText = "";
    else if (mood == 1)
      moodInText = "sehr schlecht";
    else if (mood == 2)
      moodInText = "schlecht";
    else if (mood == 3)
      moodInText = "durchschnittlich";
    else if (mood == 4)
      moodInText = "gut";
    else if (mood == 5)
      moodInText = "sehr gut";
    return moodInText;
  }
  sendeVote() {
    this.showForm = false;

    let moodPost = {
      "mood": this.formData.value.mood
    };
    this.authProvider.postMood(moodPost).subscribe();   //TODO Fehlerbehandlung
  }

  ngOnInit() {
    this.authProvider.getCurrentCalendarWeek().subscribe(week => {
      this.currentWeek = week[0];
      this.currentMood = this.schreibeMoodInText(week[1]);
    });
  }

  toggleMoodText(mood: number) {
    this.moodInText = this.schreibeMoodInText(mood);

  }
}
