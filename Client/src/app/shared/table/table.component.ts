import {
  Component,
  OnInit,
  Input,
  OnChanges,
  SimpleChanges,
  Output,
  EventEmitter,
} from '@angular/core';
import { Router } from '@angular/router';
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
  @Output() mentorVideoEvent:EventEmitter<string> = new EventEmitter<string>(); // Passing bookingId
  @Output() menteeVideoEvent:EventEmitter<string> = new EventEmitter<string>();  // Passing room Id


  isMenuOpened: boolean[] = [];    // For menu toggler
  totalMenteeBookings!:number;
  totalMentorBookings!:number;
  currentPage:number = 1;
  itemsPerPage:number = 5;
  currentMenteeDetails!:MenteeBookingsDetails[];
  currentMentorDetails!:MentorBookingDetails[];
  
  constructor(private router:Router) {}

  ngOnInit(): void {

  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['MenteeBookingDetails']) {
      if(this.MenteeBookingDetails){
        this.currentMenteeDetails =  this.showMenteeTableData();
        this.totalMenteeBookings = this.MenteeBookingDetails.length;
        this.isMenuOpened = Array(this.MenteeBookingDetails.length).fill(false);
      }
      // console.log(this.MenteeBookingDetails);
    }

    if (changes['MentorBookingDetails']) {
      if(this.MentorBookingDetails){
        this.currentMentorDetails =  this.showMentorTableData();
        this.totalMentorBookings = this.MentorBookingDetails.length;
        this.isMenuOpened = Array(this.MentorBookingDetails.length).fill(false);
      }
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

  // Mentee Pagination code 
  changeMenteeTablePage(page:number){
    this.currentPage = page;
    this.currentMenteeDetails = this.showMenteeTableData();
  }

  showMenteeTableData(): MenteeBookingsDetails[]{
    if (this.MenteeBookingDetails) {
      const startIndex = (this.currentPage - 1) * this.itemsPerPage;
      const endIndex = startIndex + this.itemsPerPage;
      return this.MenteeBookingDetails.slice(startIndex, endIndex);
    } else {
      return [];
    }
  }

  // Mentor Pagination code
  changeMentorTablePage(page:number){
    this.currentPage = page;
    this.currentMentorDetails = this.showMentorTableData();
  }

  showMentorTableData(): MentorBookingDetails[]{
    if (this.MentorBookingDetails) {
      const startIndex = (this.currentPage - 1) * this.itemsPerPage;
      const endIndex = startIndex + this.itemsPerPage;
      return this.MentorBookingDetails.slice(startIndex, endIndex);
    } else {
      return [];
    }
  }



  // Video chat implementation button click mentor
  openVedioMentor(bookingId:string){
    this.mentorVideoEvent.emit(bookingId); 
  }

  // Video chat implementation button click mentee

  openVedioMentee(bookingId:string,mentorId:any){
    const roomId = bookingId+mentorId._id;
    this.menteeVideoEvent.emit(roomId); 
  }
}
