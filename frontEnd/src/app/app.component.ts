import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LoginOrSignUpComponent } from './pages/login-or-sign-up/login-or-sign-up.component';
import { ApiService } from './api.service';
import { SignUPComponent } from './pages/sign-up/sign-up.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,LoginOrSignUpComponent,AppComponent,SignUPComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'frontEnd';

  constructor(public api:ApiService) {}
  
}
