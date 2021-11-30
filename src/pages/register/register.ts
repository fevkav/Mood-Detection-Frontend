import { Component } from '@angular/core';
import {AuthProvider} from "../../providers/auth";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {

  private managers: Array<any> = new Array();

  private formData: FormGroup;

  constructor (private formBuilder: FormBuilder,
               private authProvider: AuthProvider) {
    this.formData = this.formBuilder.group({
      fachbereich: [, Validators.required]
    });
  }

  ionViewDidLoad() {
    this.authProvider.getManagers().subscribe(json => {
      json.forEach(manager => {
        this.managers.push(manager);
      })
    });

  }

  register() {
    let id = {
      "id": this.formData.value.fachbereich
    }
    this.authProvider.register(id).subscribe();

  }

}
