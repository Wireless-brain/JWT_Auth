import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ApiService } from '../../api.service';

@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.css'
})
export class SignUPComponent {

  constructor(public api:ApiService) {}

  onSignUp(){

    let adata = {
      "fname": this.signUpForm.value.fname,
      "lname": this.signUpForm.value.lname,
      "email": this.signUpForm.value.email,
      "password": this.signUpForm.value.password
    }

    //console.log("Inside source: ",adata)
    this.api.signUpData(adata)

  }
  signUpForm = new FormGroup({
    fname: new FormControl(""),
    lname: new FormControl(""),
    email: new FormControl(""),
    password: new FormControl("")
  })
}
