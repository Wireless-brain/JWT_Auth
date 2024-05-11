import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private router: Router, private http: HttpClient) {}

  users: any

  setToken(token: string){
    localStorage.setItem('token',token)
  }

  getToken(){
    return localStorage.getItem('token')
  }

  loggedIn(){
    return this.getToken() != null
  }

  logoutNow(){
    localStorage.removeItem('token')
    this.router.navigate(['/login'])
  }

  newData(data: any) {
    
    return this.http.post("http://localhost:8080/login",data).subscribe((res: any) => {
      if (res.status)
      {
        this.setToken(res.token)
      }
    })

  }

  // loggedIn() {

  //   console.log("Value of user in auth.loggedIn(): ",this.users)
  //   if (this.users == 'abc@gmail.com'){
  //     return true
  //   }
  //   else{
  //     return false      
  //   }
  // }
}
