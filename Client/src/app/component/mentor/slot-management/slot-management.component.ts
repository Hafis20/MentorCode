import { Component, OnInit, Input } from '@angular/core';
import { CreateSlot } from 'src/app/model/mentorModel';
import { MentorService } from 'src/app/services/mentor.service';

@Component({
  selector: 'app-slot-management',
  templateUrl: './slot-management.component.html',
  styleUrls: ['./slot-management.component.css'],
})
export class SlotManagementComponent implements OnInit {
  currentDate!: Date;

  constructor(private service:MentorService) {
    this.currentDate = new Date();
  }

  ngOnInit(): void {}

  slotAddEvent(data: CreateSlot) {
    this.service.mentorCreateSlot(data).subscribe({
      next:response=>{
        console.log(response);
      }
    });
  }

  slotDate(date:Date){
    this.currentDate = date;
  }
}
