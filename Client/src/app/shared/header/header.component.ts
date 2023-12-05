import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthServiceService } from 'src/app/services/auth-service.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  constructor(private auth:AuthServiceService) {}

  currentUser!: string;
  isLogin:boolean = false;

  ngOnInit(): void {
    // Checking the mentor
    if (window.location.pathname.includes('/mentee') && this.auth.checkMenteeLoggedIn() || window.location.pathname.includes('/mentor') && this.auth.checkMentorLoggedIn()) {
      this.isLogin = true;
    }else if(window.location.pathname.includes('/mentee')){
      this.currentUser = 'mentee'
    }else if(window.location.pathname.includes('/mentor')){
      this.currentUser = 'mentor'
    } else {
      this.currentUser = '';
    }
  }
}
