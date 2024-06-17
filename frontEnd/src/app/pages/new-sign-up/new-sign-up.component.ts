import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ApiService } from '../../api.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-new-sign-up',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './new-sign-up.component.html',
  styleUrl: './new-sign-up.component.css'
})
export class NewSignUpComponent {

 constructor (private api: ApiService, private auth: AuthService) {}

 

onSignUp (){
 
  let data1 =
 {
  "fname": this.signUpForm.value.fname,
  "lname": this.signUpForm.value.lname,
  "email": this.signUpForm.value.email,
  "password": this.signUpForm.value.password,
  "profile": this.signUpForm.value.profile,
  "about": this.signUpForm.value.about,
  "mobile": this.signUpForm.value.mobile
 }

 this.auth.signUpData(data1)
}
  signUpForm = new FormGroup({
    fname: new FormControl(''),
    lname: new FormControl(''),
    email: new FormControl(''),
    password: new FormControl(''),
    profile: new FormControl(''),
    about: new FormControl(''),
    mobile: new FormControl('')
  })
}
