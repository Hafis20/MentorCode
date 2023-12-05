import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { MenteeData, MentorData } from 'src/app/model/adminModel';

@Component({
  selector: 'shared-table',
  templateUrl: './shared-table.component.html',
  styleUrls: ['./shared-table.component.css'],
})
export class SharedTableComponent implements OnInit {
  // Getting data from the parent
  @Input() usersList!: (MentorData | MenteeData)[];
  @Input() tableHeaders!: string[];

  // Sharing data to the parent
  @Output() blockUser: EventEmitter<string> = new EventEmitter<string>(); // Block user emitter
  @Output() unblockUser: EventEmitter<string> = new EventEmitter<string>(); // Unblock user emitter
  constructor() {}

  ngOnInit(): void {}

  // Checking the user is mentor
  isMentor(user: any): user is MentorData {
    return user && user.role === 'mentor';
  }

  // Blocking the user
  block(id: string) {
    this.changeStatusInTemplate(id);
    this.blockUser.emit(id);
  }

  // Unblocking the user
  unblock(id: string) {
    this.changeStatusInTemplate(id);
    this.unblockUser.emit(id);
  }

  changeStatusInTemplate(id:string):void{   // This function is used to change the current status in the template 
    this.usersList.map((user) => {         //otherwise we want to refresh the page
      if (user._id === id) {
        user.is_blocked = !user.is_blocked;
      }
    });
  }
}
