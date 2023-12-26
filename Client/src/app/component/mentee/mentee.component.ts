import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { getMentee } from 'src/app/store/Mentee/mentee.action';

@Component({
  selector: 'app-mentee',
  templateUrl: './mentee.component.html',
  styleUrls: ['./mentee.component.css'],
})
export class MenteeComponent implements OnInit {
  userType:string = 'mentee';
  constructor(private router: Router,private store:Store) {}

  ngOnInit(): void {
    this.store.dispatch(getMentee());
  }

  logout() {
    localStorage.removeItem('menteeToken');
    this.router.navigate(['/mentee/login']);
  }
}
