import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  sendData(data: any){
    console.log("Inside servie api: ",data)
    return this.http.post("http://localhost:8080/login",data).subscribe(Response => {
      console.log(Response)
    })
  }

  signUpData(data1: any){
    //console.log("Inside Api service file: ",data1)
    return this.http.post("http://localhost:8080/signUp",data1).subscribe(Response => {
      console.log(Response)
    })
  }
}
