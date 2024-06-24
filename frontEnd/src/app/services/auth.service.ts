import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';
import { Observable, catchError, of, switchMap, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private router: Router, private http: HttpClient) {}

  
  setToken(reqTkn: string, token: string){
    localStorage.setItem(reqTkn, token)
  }
  
  getToken(itmName: string){
    return localStorage.getItem(itmName)
  }
  
  loggedIn(){
    let tknVl = this.getToken("reqTkn")
    //console.log("Value of token in loggedIn(): ", tknVl )
    //console.log("Is token valid: ", this.isTokenExpired())
    if (tknVl != null){
      return true
    }
    else{
      return false
    }
    //return this.getToken("refTkn") != null
  }
  
  logoutNow(){
    
    // let tkn = {
    //   token: localStorage.getItem("refTkn")
    // }
    
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    })

    this.http.post("http://localhost:3000/logout", {}, {
      headers,
      withCredentials: true
    }).subscribe((res: any) => {
      //console.log(res)
    })
    
    localStorage.removeItem('reqTkn')
    this.router.navigate(['/login'])
  }
  
  newData(data: any) {
    
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    })

    return this.http.post("http://localhost:3000/login", data, {
      headers,
      withCredentials: true
    }).subscribe((res: any) => {
      if (res.status)
        {
          this.setToken("reqTkn", res.reqToken)
          //console.log("Request Token: ", this.getToken("reqTkn"))
          //this.setToken("refTkn", res.refreshToken)
          //console.log("Refresh Token: ", this.getToken("refTkn"))
          this.router.navigate(['/admin/home'])
        }
      })
    }
    
    isTokenExpired() {
      let tkn = localStorage.getItem("reqTkn")
      if (!tkn) return true
      
      let decode = jwtDecode(tkn)
      if (!decode.exp) return true
      let expiration_time = decode.exp * 1000
      let timeNow = new Date().getTime()
      
      //console.log("Value of experation and current time: ", expiration_time, timeNow)
      
      return expiration_time > timeNow
    }
    
    
    getData(): Observable<any> {
      
      if (!this.isTokenExpired()) {
        
        return this.refToken().pipe(
          switchMap(() => {
            
            //console.log("Sending the get request after token refresh");
            return this.http.get("http://localhost:4000/admin/home");
          }),
          catchError(error => {
            
            //console.error('Error refreshing token', error);
            return of(false); // Handle error appropriately
          })
        );
      } 
      else {
        
        //console.log("Sending the get request without token refresh");
        return this.http.get("http://localhost:4000/admin/home").pipe(tap((res:any) => {
          //console.log("From GET request: ", res)
        }))
      }
    }
    
  refToken(): Observable<any> {
      
    // const tkn = {
        
    //   token: localStorage.getItem("refTkn")
    // };
    
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    })
    //console.log("Inside refToken to get new reqTkn")
    return this.http.post("http://localhost:3000/token", {}, {
      headers,
      withCredentials: true
    })
    .pipe(tap((res: any) => {
        
      if (res.status) {
          
        //console.log("New ReqToken: ", res);
        this.setToken("reqTkn", res.reqToken);
      }
      }),
      catchError(error => {
        
        //console.error('Error refreshing token', error);
        return of(false); // Handle error appropriately
      })
    );
  }

  signUpData(data1: any){
    //console.log("Inside signUpData: ", data1)

    return this.http.post("http://localhost:3000/signUp",data1).subscribe((res:any) => {
      //console.log(Response)
      if (res.status){
        alert("SignUp Successfull")
        this.router.navigate(['/login'])
      }
    })
  }

}


