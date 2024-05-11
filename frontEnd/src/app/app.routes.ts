import { Routes } from '@angular/router';
import { LoginOrSignUpComponent } from './pages/login-or-sign-up/login-or-sign-up.component';
import { SignUPComponent } from './pages/sign-up/sign-up.component';
import { NotfoundComponent } from './pages/notfound/notfound.component';
import { NewSignUpComponent } from './pages/new-sign-up/new-sign-up.component';
import { NewSignInComponent } from './pages/new-sign-in/new-sign-in.component';
import { authGuard } from './gaurd/auth.guard';

export const routes: Routes = [

    {path: 'login', component: NewSignInComponent},
    {path: 'signUp', component: NewSignUpComponent},
    {path: '',redirectTo: '/login', pathMatch: 'full'},
    {path: 'admin', canActivate: [authGuard], loadChildren: () => import('./modules/admin/admin.module').then((m) => m.AdminModule)},
    {path: '**', component: NotfoundComponent}
];
