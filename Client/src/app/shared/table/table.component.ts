import {
  Component,
  OnInit,
  Input,
  OnChanges,
  SimpleChanges,
  Output,
  EventEmitter,
} from '@angular/core';
import {
  MenteeBookingsDetails,
  MenteeSlotAction,
  MentorBookingDetails,
} from 'src/app/model/bookingsModel';

@Component({
  selector: 'shared-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css'],
})
export class TableComponent implements OnInit, OnChanges {
  @Input() TableHeaders!: string[]; // For reciving the table headers
  @Input() MenteeBookingDetails!: MenteeBookingsDetails[];
  @Input() MentorBookingDetails!: MentorBookingDetails[];
  @Output() changeStatusEvent: EventEmitter<MenteeSlotAction> =
    new EventEmitter<MenteeSlotAction>();

  @Output() filterEvent:EventEmitter<string> = new EventEmitter<string>();
  isMenuOpened: boolean[] = [];    // For menu toggler
  constructor() {}

  ngOnInit(): void {

  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['MenteeBookingDetails']) {
      if(this.MenteeBookingDetails){
        this.MenteeBookingDetails = this.MenteeBookingDetails;
        this.isMenuOpened = Array(this.MenteeBookingDetails.length).fill(false);
      }
      // console.log(this.MenteeBookingDetails);
    }

    if (changes['MentorBookingDetails']) {
      console.log(this.MentorBookingDetails);
    }
  }

  toggleMenu(index:number){
    this.isMenuOpened[index] = !this.isMenuOpened[index];
  }

  // Completed the mentorship
  completed(bookingId: string) {
    this.changeStatusEvent.emit({ bookingId: bookingId, status: 'completed' });
  }

  // Cancel the mentor ship
  cancel(bookingId:string){
    this.changeStatusEvent.emit({ bookingId: bookingId, status: 'cancelled' });
  }
  
  // Cancellation from mentor side
  cancelByMentor(bookingId:string,menteeId:string){
    this.changeStatusEvent.emit({bookingId:bookingId,menteeId:menteeId,status:'Mentor cancelled'});
  }
  
  filter(value:string){
    this.filterEvent.emit(value);
  }
}
