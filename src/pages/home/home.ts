import { Component } from '@angular/core';
import {NavController} from "ionic-angular";
import {AuthProvider} from "../../providers/auth";
import {VoteListComponent} from "../../components/votelist/votelist";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {


  constructor(private navCtrl: NavController,
              private authService: AuthProvider) {}

  private geheZurStatistik(){
    this.navCtrl.push(VoteListComponent);
  }


/*  ionViewDidLoad() {
    this.tokenService.initToken();
  }*/

  private logout() {
    this.authService.logout();
  }
}
