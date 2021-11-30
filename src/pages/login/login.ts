import { Component } from '@angular/core';
import {AuthProvider} from "../../providers/auth";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AlertController, LoadingController} from "ionic-angular";


@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  private formData: FormGroup;

  constructor (private formBuilder: FormBuilder,
               private authProvider: AuthProvider,
               private loadingCtrl: LoadingController,
               private alertCtrl: AlertController) {

    this.formData = this.formBuilder.group({
      username: [, Validators.required],
      password: [, Validators.required]
    });
  }

  login() {
    let postLogin = {
      "username": this.formData.value.username,
      "password": this.formData.value.password
    };

    let loader = this.loadingCtrl.create({
      content: "Logging in..."
    });
    loader.present();


    this.authProvider.login(postLogin).subscribe(
      data => loader.dismissAll(),
      err => {
        loader.dismissAll();
        let alert = this.alertCtrl.create({
          title: "Login Error",
          buttons:['OK']
        });
        alert.present();

      }
    );
  }

}
