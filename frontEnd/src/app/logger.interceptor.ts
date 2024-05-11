import { HttpInterceptorFn } from '@angular/common/http';
import { AuthService } from './services/auth.service';
import { inject } from '@angular/core';

export const loggerInterceptor: HttpInterceptorFn = (req, next) => {

  const authService = inject(AuthService)
  const token = authService.getToken()

  if (token)
  { 
    req.clone({
      setHeaders: {
        Authorization: 'Bearer ${token}',
      }
    })
  }

  return next(req)
};