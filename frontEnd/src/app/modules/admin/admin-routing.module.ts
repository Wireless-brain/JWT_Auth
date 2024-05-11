import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component';
import { HomeComponent } from './components/home/home.component';
import { ContactComponent } from './components/contact/contact.component';
import { AboutComponent } from './components/about/about.component';
import { ServiceProvidedComponent } from './components/service-provided/service-provided.component';

const routes: Routes = [

  {path: '', component: AdminDashboardComponent,
    children: 
    [
      {path: 'home', component: HomeComponent},
      {path: 'contact', component: ContactComponent},
      {path: 'services', component: ServiceProvidedComponent},
      {path: 'about', component: AboutComponent},
      {path: '', redirectTo: '/admin/home', pathMatch: 'full'}
    ]
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
