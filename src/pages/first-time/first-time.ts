import { Component } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthProvider} from "../../providers/auth";
import {NavController} from "ionic-angular";
import {LoginPage} from "../login/login";
import {RegisterPage} from "../register/register";

@Component({
  selector: 'page-first-time',
  templateUrl: 'first-time.html',
})
export class FirstTimePage {
  private formData: FormGroup;

  constructor(private formBuilder:FormBuilder,
              private authProvider: AuthProvider,
              private navCtrl: NavController) {
    this.formData = this.formBuilder.group({
      isManager: [, Validators.required]
    });
  }

  goto() {
    if (this.formData.value.isManager == "true") {
      this.navCtrl.push(LoginPage);
    }
    else {
      this.navCtrl.push(RegisterPage);
    }
  }

}
