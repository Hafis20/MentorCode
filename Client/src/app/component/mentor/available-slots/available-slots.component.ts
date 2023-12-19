import { Component, EventEmitter, OnInit, Output, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import { SlotModel } from 'src/app/model/mentorModel';
import { getMentorInfo } from 'src/app/store/Mentor/mentor.selector';

@Component({
  selector: 'available-slots',
  templateUrl: './available-slots.component.html',
  styleUrls: ['./available-slots.component.css'],
})
export class AvailableSlotsComponent implements OnInit {
  @Input() currentDate!: Date;
  @Input() timeSlots!:string[];
  @Output() createSlotEvent: EventEmitter<SlotModel> = new EventEmitter<SlotModel>();
  mentorId!:string;

  
  constructor(private store:Store) {}
  ngOnInit(): void {
    this.store.select(getMentorInfo).subscribe({
      next:(response)=>{
        this.mentorId = response._id;
      }
    })
  }

  addSlot(time: string) {
    const data:SlotModel = {
      mentorId:this.mentorId,
      date: this.currentDate,
      time: time,
    };
    this.createSlotEvent.emit(data);
  }
}
