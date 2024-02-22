import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { AuthServiceService } from 'src/app/services/auth-service.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  @Output() gotoProfileEvent:EventEmitter<void> = new EventEmitter<void>
  constructor(private auth:AuthServiceService,private router:Router) {}

  currentUser!: string;
  menteeLoggedIn:boolean = false;
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

    this.menteeLoggedIn = this.auth.checkMenteeLoggedIn();
  }

  gotoProfile(){
    if(this.menteeLoggedIn){
      this.router.navigate(['/mentee/dashboard']);
    }
    this.gotoProfileEvent.emit();
  }
}
