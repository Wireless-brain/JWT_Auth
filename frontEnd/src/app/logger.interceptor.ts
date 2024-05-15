import { HttpInterceptorFn } from '@angular/common/http';
import { AuthService } from './services/auth.service';
import { inject } from '@angular/core';

export const loggerInterceptor: HttpInterceptorFn = (req, next) => {

  const authService = inject(AuthService)
  const token = authService.getToken("reqTkn")

  if (token)
  { 
    let cloned = req.clone({
      setHeaders: {
        authorization: 'Bearer ' + token,
      },
    })

    return next(cloned)
  }

  return next(req)
};
