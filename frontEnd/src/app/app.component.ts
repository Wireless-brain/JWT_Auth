import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LoginOrSignUpComponent } from './pages/login-or-sign-up/login-or-sign-up.component';
import { ApiService } from './api.service';
import { SignUPComponent } from './pages/sign-up/sign-up.component';
import { NewSignInComponent } from './pages/new-sign-in/new-sign-in.component';
import { NewSignUpComponent } from './pages/new-sign-up/new-sign-up.component';
import { HeaderComponent } from './modules/admin/components/header/header.component';
import { FooterComponent } from './modules/admin/components/footer/footer.component';
import { HomeComponent } from './modules/admin/components/home/home.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,LoginOrSignUpComponent,AppComponent,SignUPComponent,NewSignInComponent,NewSignUpComponent, HeaderComponent, FooterComponent, HomeComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'frontEnd';

  constructor(public api:ApiService) {}
  
}
