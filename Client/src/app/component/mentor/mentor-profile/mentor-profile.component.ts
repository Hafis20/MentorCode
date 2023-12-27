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

  constructor(private service:MentorService,
    private mentorSlotService:MentorSlotService,
    private showMessage:MessageToastrService
  ) {}
  ngOnInit(): void {
    this.service.getMentorProfile().subscribe({
      next:(response)=>{
        this.mentor = response[0];
        this.getDefaultSlotsOfMentor();
      }
    })
  }

  getDefaultSlotsOfMentor(){
    this.mentorSlotService.getDefaultSlot().subscribe({
      next:(response)=>{
        this.timeSlots = this.timeSlots.filter((slot)=>{
          return !response.includes(slot);
        })
      },
      error:(error)=>{
        console.log(error.error.message);
      }
    })
  }

  defaultSlotSetting(time:string){
    this.mentorSlotService.setDefaultSlot({time}).subscribe({
      next:(response)=>{
        this.getDefaultSlotsOfMentor(); // Refreshing the component
        this.showMessage.showSuccessToastr(response.message);
      },
      error:(error)=>{
        this.showMessage.showErrorToastr(error.error.message);
      }
    })
    
  }
}
