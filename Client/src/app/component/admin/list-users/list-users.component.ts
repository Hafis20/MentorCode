// list-users.component.ts

import { Component } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MenteeInfo } from 'src/app/model/commonModel';
import { MenteeList } from 'src/app/model/menteeModel';

@Component({
  selector: 'list-users',
  templateUrl: './list-users.component.html',
  styleUrls: ['./list-users.component.css']
})
export class ListUsersComponent {
  usersList!: MenteeList[];
  displayedColumns: string[] = ['name', 'email','mobile','edit','block']; // Add more columns as needed
  datasource:any;
  ngOnInit(){
    this.usersList = this.users();
    this.datasource = new MatTableDataSource<MenteeList>(this.usersList)
  }

  users(){
    return [{name:'Hafis',email:'email@gmail.com',mobile:'25412542',is_blocked:true}]
  }
}
