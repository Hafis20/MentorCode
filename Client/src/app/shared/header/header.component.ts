import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  constructor(private router:Router){}

  @Input() role:string = '';
  smallview: string = "hidden"

  ngOnInit(): void {
    
  }
  tog() {
    if (this.smallview == "") {
      this.smallview = "hidden"
      return
    }
    this.smallview = ""

  }

  navigateLogin(){
    if(this.role === 'mentee'){
      this.router.navigate(['/mentee-login']);
    }else if(this.role === 'admin'){
      this.router.navigate(['admin-login']);
    }
  }
}
