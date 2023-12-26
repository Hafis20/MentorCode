import { Component, OnInit } from '@angular/core';
import { MentorProfile } from 'src/app/model/mentorModel';
import { MentorService } from 'src/app/services/mentor.service';

@Component({
  selector: 'app-mentor-profile',
  templateUrl: './mentor-profile.component.html',
  styleUrls: ['./mentor-profile.component.css'],
})
export class MentorProfileComponent implements OnInit {
  timeSlots: string[] = [
    '09:00 AM to 10:00 AM',
    '10:00 AM to 11:00 AM',
    '11:00 AM to 12:00 PM',
    '01:00 PM to 02:00 PM',
    '02:00 PM to 03:00 PM',
    '03:00 PM to 04:00 PM',
    '04:00 PM to 05:00 PM',
  ];
  mentor!:MentorProfile;
  from:string = 'editProfile'

  constructor(private service:MentorService) {}
  ngOnInit(): void {
    this.service.getMentorProfile().subscribe({
      next:(response)=>{
        this.mentor = response[0];
      }
    })
  }
}
