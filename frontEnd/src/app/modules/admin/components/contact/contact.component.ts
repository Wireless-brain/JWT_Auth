import { Component } from '@angular/core';
import { AuthService } from '../../../../services/auth.service';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.css'
})
export class ContactComponent {

  constructor(private auth: AuthService){}

  fname: any
  lname: any
  imgSrc: any
  about: any
  mobile: any
  email: any

  ngOnInit(){
    this.auth.getData().subscribe((res: any) => {
      //console.log(res)
      this.fname = res.fname
      this.lname = res.lname
      this.imgSrc = res.photo
      this.about = res.about
      this.mobile = res.mobile
      this.email = res.email
    })
  }

}
