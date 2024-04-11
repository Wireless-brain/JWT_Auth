import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  // sendData(data: any){
  //   console.log("From the service Api: ", data);
    
  //   this.http.post("http://localhost:8080/login", data)
  //     .subscribe(
  //       (response) => {
  //         console.log("Post request successful", response);
  //         // You can perform additional actions with the response data here
  //       },
  //       (error) => {
  //         console.error("Error occurred during post request", error);
  //         // Handle error here, e.g., show error message to the user
  //       }
  //     );
  // }

  sendData(data: any){
    console.log("Inside servie api: ",data)
    return this.http.post("http://localhost:8080/login",data).subscribe(Response => {
      console.log(Response)
    })
  }
}
