import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = (route, state) => {

  const authService = inject(AuthService)
  const router = inject(Router)
  let retVal = authService.loggedIn()
  //console.log("Value from loggedIn(): ",!retVal)
  if (!retVal){    
    //console.log("Inside the gaurd")
    router.navigate(['/login'])
    return false
  }
  //console.log("Inside gaurd. Result evaluated to be true")
  return true  
};