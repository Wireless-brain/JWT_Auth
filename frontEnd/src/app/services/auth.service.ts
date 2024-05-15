import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private router: Router, private http: HttpClient) {}


  tokenHandling(){

    if (!this.isTokenExpired()){
      this.refToken()
      return localStorage.getItem("reqTkn") 
    }
    else{
      return localStorage.getItem("reqTkn")
    }

  }


  getData() {
    
    // let retVal = this.isTokenExpired()
    // console.log("Is token valid: ",retVal)
    
    // if (!retVal){
    //   this.refToken()
    // }
    
    // let jwttoken = localStorage.getItem("reqTkn")
    let jwttoken = this.tokenHandling()

    console.log("Sending the get request")
    return this.http.get("http://localhost:4000/admin/home", {
      headers: {
        authorization: 'Bearer ' + jwttoken,
      },
    })
  }

  // async getData() {
    
  //   let jwttoken = await this.tokenHandling()
  //   console.log(jwttoken)
  //   console.log("Sending the get request")
  //   return this.http.get("http://localhost:4000/admin/home", {
  //     headers: {
  //       authorization: 'Bearer ' + jwttoken,
  //     },
  //   })
  // }

  setToken(reqTkn: string, token: string){
    localStorage.setItem(reqTkn, token)
  }

  getToken(itmName: string){
    return localStorage.getItem(itmName)
  }

  loggedIn(){
    let tknVl = this.getToken("refTkn")
    console.log("Value of token in loggedIn(): ", tknVl )
    if (tknVl == null){
      return false
    }
    else{
      return true
    }
    //return this.getToken("refTkn") != null
  }

  logoutNow(){

    let tkn = {
      token: localStorage.getItem("refTkn")
    }

    this.http.post("http://localhost:3000/logout", tkn).subscribe((res: any) => {
      console.log(res)
    })

    localStorage.removeItem('refTkn')
    this.router.navigate(['/login'])
  }

  newData(data: any) {
    
    return this.http.post("http://localhost:3000/login",data).subscribe((res: any) => {
      if (res.status)
      {
        this.setToken("reqTkn", res.reqToken)
        console.log("Request Token: ", this.getToken("reqTkn"))
        this.setToken("refTkn", res.refreshToken)
        console.log("Refresh Token: ", this.getToken("refTkn"))
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
    
    console.log("Value of experation and current time: ", expiration_time, timeNow)

    return expiration_time > timeNow
  }

  refToken(){

    let tkn = {
      token: localStorage.getItem("refTkn")
    }    

    this.http.post("http://localhost:3000/token", tkn).subscribe((res: any) => {
      if (res.status){
        console.log("Refreshed token: ", res)
        this.setToken("reqTkn", res.reqToken)
        return true
      }
      return false
    })
    return false
  }
}
