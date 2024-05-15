import { Component } from '@angular/core';
import { AuthService } from '../../../../services/auth.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  constructor(private auth: AuthService) {}
  
  fname: any
  lname: any
  ngOnInit() {
    this.auth.getData().subscribe((res: any) => {
      console.log(res)
      this.fname = res.fname
      this.lname = res.lname
    })
  }

  logout(){
    this.auth.logoutNow()
  }
}
