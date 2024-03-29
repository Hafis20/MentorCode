import { Component, OnInit } from '@angular/core';
import { MentorProfile } from 'src/app/model/mentorModel';
import { MentorSlotService } from 'src/app/services/mentor-slot.service';
import { MentorService } from 'src/app/services/mentor.service';
import { MessageToastrService } from 'src/app/services/message-toastr.service';

@Component({
  selector: 'app-mentor-profile',
  templateUrl: './mentor-profile.component.html',
  styleUrls: ['./mentor-profile.component.css'],
})
export class MentorProfileComponent implements OnInit {
  
  mentor!:MentorProfile;

  constructor(private service:MentorService,
  ) {}
  ngOnInit(): void {
    this.service.getMentorProfile().subscribe({
      next:(response)=>{
        this.mentor = response[0];
      }
    })
  }

}
