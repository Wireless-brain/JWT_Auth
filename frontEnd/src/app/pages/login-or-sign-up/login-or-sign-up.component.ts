import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ApiService } from '../../api.service';
import { RouterLink } from '@angular/router';


@Component({
  selector: 'app-login-or-sign-up',
  standalone: true,
  imports: [ReactiveFormsModule,RouterLink],
  templateUrl: './login-or-sign-up.component.html',
  styleUrl: './login-or-sign-up.component.css'
})
export class LoginOrSignUpComponent {
  constructor(public api:ApiService) {}
  
  onSubmit(){

    let data = {

    "email":this.signInForm.value.email,
    "password":this.signInForm.value.password
    }

    //this.api.sendData(data)
  }
  signInForm = new FormGroup({
    email: new FormControl(""),
    password: new FormControl("")
  })
}


