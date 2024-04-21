import { Routes } from '@angular/router';
import { LoginOrSignUpComponent } from './pages/login-or-sign-up/login-or-sign-up.component';
import { SignUPComponent } from './pages/sign-up/sign-up.component';

export const routes: Routes = [

    {path: '', component: LoginOrSignUpComponent},
    {path: 'signUp', component: SignUPComponent}
];
