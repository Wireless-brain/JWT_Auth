import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ApiService } from '../../api.service';

@Component({
  selector: 'app-new-sign-in',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './new-sign-in.component.html',
  styleUrl: './new-sign-in.component.css'
})
export class NewSignInComponent {

  constructor(public api: ApiService) {}

  onSubmit(){
    let data = 
    {
      "email": this.signInForm.value.email,
      "password": this.signInForm.value.password 
    }
    this.api.sendData(data)
  }

  signInForm = new FormGroup({
    email: new FormControl(""),
    password: new FormControl("")
  })
}
