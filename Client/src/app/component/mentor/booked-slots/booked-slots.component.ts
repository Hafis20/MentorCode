import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Store } from '@ngrx/store';
import { SlotModel } from 'src/app/model/mentorModel';
import { getMentorInfo } from 'src/app/store/Mentor/mentor.selector';

@Component({
  selector: 'booked-slots',
  templateUrl: './booked-slots.component.html',
  styleUrls: ['./booked-slots.component.css'],
})
export class BookedSlotsComponent implements OnInit {
  @Input() currentDate!: Date;
  @Input() bookedSlots!: string[];
  @Output() deleteSlotEvent: EventEmitter<SlotModel> = new EventEmitter<SlotModel>();
  mentorId!:string;


  constructor(private store: Store) {}

  ngOnInit(): void {
    this.store.select(getMentorInfo).subscribe({
      next:(response)=>{
        this.mentorId = response._id;
      }
    })
  }

  cancelbtn(time:string) {
    const data:SlotModel = {
      mentorId:this.mentorId,
      date:this.currentDate,
      time:time,
    }
    this.deleteSlotEvent.emit(data);
  }
}
