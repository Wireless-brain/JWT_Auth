import { Component } from '@angular/core';
import { AuthService } from '../../../../services/auth.service';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [],
  templateUrl: './about.component.html',
  styleUrl: './about.component.css'
})
export class AboutComponent {

  constructor(private auth: AuthService) {}
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
