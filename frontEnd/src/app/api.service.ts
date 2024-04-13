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
}
