import { Component, OnInit, Input, Output, EventEmitter  } from '@angular/core';
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
  userType!: string;

  // Sharing data to the parent 
  @Output() blockUser:EventEmitter<string> = new EventEmitter<string>();  // Block user emitter

  constructor() {}

  ngOnInit(): void {
    
  }

  // Checking the user is mentor
  isMentor(user: any): user is MentorData {
    return user && user.role === 'mentor';
  }

  // Blocking the user
  block(id:string){
    this.blockUser.emit(id);
  }

  unblock(id:string){
    console.log(id)
  }
}
