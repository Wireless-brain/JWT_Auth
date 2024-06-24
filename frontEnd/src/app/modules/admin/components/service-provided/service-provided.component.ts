import { Component } from '@angular/core';
import { AuthService } from '../../../../services/auth.service';

@Component({
  selector: 'app-service-provided',
  standalone: true,
  imports: [],
  templateUrl: './service-provided.component.html',
  styleUrl: './service-provided.component.css'
})
export class ServiceProvidedComponent {

  constructor(private auth: AuthService){}

  fname: any
  lname: any
  imgSrc: any
  about: any
  mobile: any

  ngOnInit(){
    this.auth.getData().subscribe((res: any) => {
      //console.log(res)
      this.fname = res.fname
      this.lname = res.lname
      this.imgSrc = res.photo
      this.about = res.about
      this.mobile = res.mobile
    })
  }

}
