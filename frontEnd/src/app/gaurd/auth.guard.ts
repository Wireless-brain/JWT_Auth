import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = (route, state) => {

  const authService = inject(AuthService)
  const router = inject(Router)

  if (!authService.loggedIn()){    
    console.log("Inside the gaurd")
    router.navigate(['/login'])
    return false
  }
  console.log("Inside gaurd. Result evaluated to be true")
  return true  
};