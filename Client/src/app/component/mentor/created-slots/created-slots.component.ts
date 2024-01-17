import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  SimpleChanges,
} from '@angular/core';
import { Store } from '@ngrx/store';
import { SlotModel } from 'src/app/model/mentorModel';
import { DefaultSlotsOfMentor, ShowSlots } from 'src/app/model/slotModel';
import { getMentorInfo } from 'src/app/store/Mentor/mentor.selector';

@Component({
  selector: 'created-slots',
  templateUrl: './created-slots.component.html',
  styleUrls: ['./created-slots.component.css'],
})
export class BookedSlotsComponent implements OnInit {
  @Input() currentDate!: Date;
  @Input() createdSlots!: ShowSlots[];
  @Input() createdDefaultSlots!: string[];
  @Input() from!: string;
  @Output() deleteSlotEvent: EventEmitter<SlotModel> =
    new EventEmitter<SlotModel>();

  @Output() removeDefaultSlotEvent: EventEmitter<string> =
    new EventEmitter<string>();  // Removing default slot

  mentorId!: string;

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.store.select(getMentorInfo).subscribe({
      next: (response) => {
        this.mentorId = response._id;
      },
    });
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['createdSlots']) {
      this.createdSlots = this.createdSlots;
    }
    if (changes['createdDefaultSlots']) {
      this.createdDefaultSlots = this.createdDefaultSlots;
      console.log(this.createdDefaultSlots);
    }
  }

  cancelbtn(time: string) {
    const data: SlotModel = {
      mentorId: this.mentorId,
      date: this.currentDate,
      time: time,
    };
    this.deleteSlotEvent.emit(data);
  }

  removeDefault(time: string) {
    this.removeDefaultSlotEvent.emit(time);
  }
}
