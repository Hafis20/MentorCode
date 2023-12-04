import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { MenteeData, MentorData } from 'src/app/model/adminModel';

@Component({
  selector: 'shared-table',
  templateUrl: './shared-table.component.html',
  styleUrls: ['./shared-table.component.css'],
})
export class SharedTableComponent implements OnInit {
  @Input() usersList!: (MentorData | MenteeData)[];
  @Input() tableHeaders!: string[];
  userType!: string;
  constructor() {}

  ngOnInit(): void {
    
  }

  // Checking the user is mentor
  isMentor(user: any): user is MentorData {
    return user && user.role === 'mentor';
  }

  block(id:string){
    console.log(id)
  }
}
