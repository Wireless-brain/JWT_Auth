import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-new-sign-in',
  standalone: true,
  imports: [ReactiveFormsModule,RouterLink],
  templateUrl: './new-sign-in.component.html',
  styleUrl: './new-sign-in.component.css'
})
export class NewSignInComponent {

  constructor(public auth: AuthService, private router: Router) {}

  ngOnInit(){
    if (this.auth.loggedIn()){
      this.router.navigate(['/admin/home'])
    }
  }

  onSubmit(){
    let data = 
    {
      "email": this.signInForm.value.email,
      "password": this.signInForm.value.password 
    }

    //console.log("Empty form",data)
    if (data.email == "" || data.password == ""){
      alert("Enter the username and password")
    }
    else{
      this.auth.newData(data)
      //this.router.navigate(['/admin/home'])
    }
  }

  signInForm = new FormGroup({
    email: new FormControl(""),
    password: new FormControl("")
  })
}
