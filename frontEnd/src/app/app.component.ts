import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LoginOrSignUpComponent } from './pages/login-or-sign-up/login-or-sign-up.component';
import { ApiService } from './api.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,LoginOrSignUpComponent,AppComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'frontEnd';

  data: any = []

  constructor(public api:ApiService) {}
  
}
