import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import {
  ListMentorsHomeOfMentee,
  ShowMenteeCalenderData,
} from 'src/app/model/menteeModel';
import { GetMentorSlots } from 'src/app/model/mentorModel';
import { BookSlot, ShowSlots } from 'src/app/model/slotModel';
import { MenteeSlotService } from 'src/app/services/mentee-slot.service';
import { MenteeService } from 'src/app/services/mentee.service';
import { MessageToastrService } from 'src/app/services/message-toastr.service';
import { getMentee } from 'src/app/store/Mentee/mentee.action';

@Component({
  selector: 'view-mentor',
  templateUrl: './view-mentor.component.html',
  styleUrls: ['./view-mentor.component.css'],
})
export class ViewMentorComponent implements OnInit {
  userType: string = 'mentee';
  mentorDetails!: ListMentorsHomeOfMentee;
  slotDates!: string[];
  calenderResponse!: GetMentorSlots;
  slotTimes!: ShowSlots[];
  currentDate!: Date;
  mentorId!: string;
  bookedDates!:string[];
  constructor(
    private route: ActivatedRoute,
    private service: MenteeService,
    private store: Store,
    private slotService: MenteeSlotService,
    private showMessage: MessageToastrService
  ) {}

  ngOnInit(): void {
    this.currentDate = new Date();
    this.mentorId = this.route.snapshot.paramMap.get('id') as string;
    this.service.getMentor(this.mentorId).subscribe({
      next: (response) => {
        this.mentorDetails = response;
      },
      error:error=>{
        this.showMessage.showErrorToastr(error.error.message);
      }
    });

    this.calenderData();  // For getting the data into the calender;

    // Dispatch an action for getting menteee data in to the store
    this.store.dispatch(getMentee());
  }


  calenderData(){
    this.service.getMentorSlots(this.mentorId).subscribe({
      next: (response) => {
        this.slotDates = response.response.map((doc)=>doc.slot_date);   // which shows the mentor available slots
        this.calenderResponse = response;
        this.slotsOfTheDay(this.currentDate);
        this.bookedDates = response.response
        .filter((mentorSlotDate) => mentorSlotDate.slots.every((slot) => slot.is_booked))
        .map((mentorSlotDate) => mentorSlotDate.slot_date);
      },
      error:error=>{
        this.showMessage.showErrorToastr(error.error.message);
      }
    });
  }

  slotsOfTheDay(date: Date) {
    const day = date.toDateString();
    this.currentDate = date;
    const dateTime = this.calenderResponse.response.find((doc)=>doc.slot_date === day);
     this.slotTimes = dateTime?.slots  as ShowSlots[] // Passing the data in to cards of slot
  }

  bookingTime(time: string) {
    const data:BookSlot = {
      mentorId: this.mentorId,
      slotDate: this.currentDate.toDateString(),
      slotTime: time,
    };
    this.slotService.bookSlot(data).subscribe({
      next:(response)=>{
        this.calenderData();     // For refreshing the calender data
        this.slotsOfTheDay(this.currentDate);  // Passing the this.current date times into the slot component
        this.showMessage.showSuccessToastr(response.message);
      },
      error:error=>{
        this.showMessage.showErrorToastr(error.error.message);
      }
    })
  }
}
