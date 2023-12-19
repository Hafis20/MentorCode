import { Component, OnInit, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import { UserInfo } from 'src/app/model/commonModel';
import { SlotModel, GetSlotByDate } from 'src/app/model/mentorModel';
import { ShowSlots } from 'src/app/model/slotModel';
import { MentorSlotService } from 'src/app/services/mentor-slot.service';
import { MessageToastrService } from 'src/app/services/message-toastr.service';
import { getMentor } from 'src/app/store/Mentor/mentor.action';
import { getMentorInfo } from 'src/app/store/Mentor/mentor.selector';

@Component({
  selector: 'app-slot-management',
  templateUrl: './slot-management.component.html',
  styleUrls: ['./slot-management.component.css'],
})
export class SlotManagementComponent implements OnInit {
  currentDate!: Date;
  timeSlots: string[] = [
    '09:00 AM to 10:00 AM',
    '10:00 AM to 11:00 AM',
    '11:00 AM to 12:00 PM',
    '01:00 PM to 02:00 PM',
    '02:00 PM to 03:00 PM',
    '03:00 PM to 04:00 PM',
    '04:00 PM to 05:00 PM',
  ];
  createdSlots: ShowSlots[] = [];
  unbookedSlots: string[] = [];
  mentorDetails!: UserInfo;
  createdSlotDates!:string[];

  constructor(private service: MentorSlotService, private store: Store,private showMessage:MessageToastrService) {}

  ngOnInit(): void {
    this.currentDate = new Date();

    this.getSlotsOfMentor();

    this.store.select(getMentorInfo).subscribe({
      next: (response) => {
        this.mentorDetails = response;
        this.slotDate(this.currentDate);
      },
      error: (error) => {
        console.log('Slot management store error');
      },
    });

    const data: GetSlotByDate = {
      // whenever we click on a date we want to show In that day any booked slots are available or not
      mentorId: this.mentorDetails._id,
      date: this.currentDate,
    };
    this.service.getSlotsByDate(data).subscribe({
      next: (response) => {
        this.createdSlots = response.response.slots;
        this.timeSlots = this.timeSlots.filter((time) => {
          return !response.response.slots.map((doc)=>doc.time).includes(time);
        });
      },
    });
  }

  getSlotsOfMentor(){
    this.service.getSlotsOfMentor().subscribe({
      next:(response)=>{
        console.log(response);
        this.createdSlotDates = response.response.map((doc)=>doc.slot_date);
      }
    })
  }

  slotCreateEvent(data: SlotModel) {  // For creating slot whenever the event occur
    this.service.mentorCreateSlot(data).subscribe({
      next: (response) => {
        this.getSlotsOfMentor();
        this.showMessage.showSuccessToastr(response.message);
        this.createdSlots = response.response.slots;
        this.unbookedSlots = this.timeSlots.filter((time) => {
          return !response.response.slots.map((doc)=>doc.time).includes(time);
        });
      },
    });
  }

  slotDeleteEvent(data:SlotModel){   // Deleted fucntionality code 
    this.service.mentorDeleteSlot(data).subscribe({
      next:(response)=>{
        this.getSlotsOfMentor();
        this.showMessage.showSuccessToastr(response.message);
        this.createdSlots = response.response.slots;
        this.unbookedSlots = this.timeSlots.filter((time) => {
          return !response.response.slots.map((doc)=>doc.time).includes(time);
        });
        console.log(this.unbookedSlots);
      }
    })
  }

  slotDate(date: Date) {
    this.currentDate = date;
    const data: GetSlotByDate = {  // whenever we click on a date we want to show In that day any booked slots are available or not
      mentorId: this.mentorDetails._id,
      date: this.currentDate,
    };
    this.service.getSlotsByDate(data).subscribe({
      next: (response) => {
        this.createdSlots = response.response.slots;
        if(this.createdSlots.length > 0){
          this.unbookedSlots = this.timeSlots.filter((time) => {
            return !response.response.slots.map((doc)=>doc.time).includes(time);
          });
        }else{
          this.unbookedSlots = this.timeSlots;
        }
      },
    });
  }
  
}
