import { Component, EventEmitter, OnInit, Output, Input } from '@angular/core';
import { CreateSlot } from 'src/app/model/mentorModel';

@Component({
  selector: 'available-slots',
  templateUrl: './available-slots.component.html',
  styleUrls: ['./available-slots.component.css'],
})
export class AvailableSlotsComponent implements OnInit {
  @Input() currentDate!: Date;
  @Output() slotEvent: EventEmitter<CreateSlot> = new EventEmitter<CreateSlot>();

  timeSlots: string[] = [
    '09:00 AM to 10:00 AM',
    '10:00 AM to 11:00 AM',
    '11:00 AM to 12:00 PM',
    '01:00 PM to 02:00 PM',
    '02:00 PM to 03:00 PM',
    '03:00 PM to 04:00 PM',
    '04:00 PM to 05:00 PM',
  ];
  constructor() {}
  ngOnInit(): void {}

  addSlot(time: string) {
    const data:CreateSlot = {
      date: this.currentDate,
      time: time,
    };
    this.slotEvent.emit(data);
  }
}
