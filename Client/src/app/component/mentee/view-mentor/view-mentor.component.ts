import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ListMentorsHomeOfMentee, ShowMenteeCalenderData } from 'src/app/model/menteeModel';
import { MenteeService } from 'src/app/services/mentee.service';
import { MentorSlotService } from 'src/app/services/mentor-slot.service';

@Component({
  selector: 'view-mentor',
  templateUrl: './view-mentor.component.html',
  styleUrls: ['./view-mentor.component.css'],
})
export class ViewMentorComponent implements OnInit {
  userType: string = 'mentee';
  mentorDetails!: ListMentorsHomeOfMentee;
  slotDates!:string[];
  calenderResponse!:ShowMenteeCalenderData[];
  slotTimes!:[];
  currentDate!:Date;
  constructor(private route: ActivatedRoute, private service: MenteeService,private mentorService:MentorSlotService) {}

  ngOnInit(): void {

    this.currentDate = new Date();
    const mentorId = this.route.snapshot.paramMap.get('id') as string;
    this.service.getMentor(mentorId).subscribe({
      next: (response) => {
        this.mentorDetails = response;
      },
    });

    this.service.getMentorSlots(mentorId).subscribe({
      next: (response) => {
        this.slotDates = response.map((data) => data.slot_date);
        this.calenderResponse = response;
        this.slotsOfTheDay(this.currentDate);
      },
    });
  }
  

  slotsOfTheDay(date:Date){
    const day = date.toDateString();
    const dateTime = this.calenderResponse.find((data)=>data.slot_date === day);
    this.slotTimes = dateTime?.added_slots as [];
  }
}



