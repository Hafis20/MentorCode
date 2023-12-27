import { Component, OnInit } from '@angular/core';
import {
  MenteeBookingsDetails,
  MenteeSlotAction,
} from 'src/app/model/bookingsModel';
import { MenteeSlotService } from 'src/app/services/mentee-slot.service';
import { MessageToastrService } from 'src/app/services/message-toastr.service';

@Component({
  selector: 'app-my-bookings',
  templateUrl: './my-bookings.component.html',
  styleUrls: ['./my-bookings.component.css'],
})
export class MyBookingsComponent implements OnInit {
  TableHeaders: string[] = [
    // Passing to the table component for showing the table header
    'Mentor',
    'Date',
    'Time',
    'Status',
    'Action',
  ];

  BookingDetails!: MenteeBookingsDetails[]; // Setting and passing the data about booking details of the user
  filterDetails!:MenteeBookingsDetails[];
  constructor(
    private service: MenteeSlotService,
    private showMessage: MessageToastrService
  ) {}

  ngOnInit(): void {
    this.getMenteeBookingDetails();
  }

  getMenteeBookingDetails() {
    this.service.getMenteeBookingDetails().subscribe({
      // For getting the mentee booking details service
      next: (response) => {
        this.BookingDetails = response; // Setting the data of details
        this.filterDetails = response
      },
    });
  }
  completeAction(data: MenteeSlotAction) {
    if (data.status === 'completed') {
      this.service.completeMentorShip(data).subscribe({
        // Response of complete action
        next: (response) => {
          this.showMessage.showSuccessToastr(response.message);
          this.getMenteeBookingDetails();
        },
        error: (error) => {
          this.showMessage.showErrorToastr(error.error.message);
        },
      });
    } else {
      this.service.cancelMentorShip(data).subscribe({
        // Response of cancel booking
        next: (response) => {
          this.showMessage.showSuccessToastr(response.message);
          this.getMenteeBookingDetails();
        },
        error: (error) => {
          this.showMessage.showErrorToastr(error.error.message);
        },
      });
    }
  }

  filter(type:string){
    if(type === 'all'){
      this.BookingDetails = this.filterDetails;
    }else if(type === 'completed'){
      this.BookingDetails = this.filterDetails.filter((booking)=>{
        return booking.status === 'completed'
      })
    }else if(type === 'cancelled'){
      this.BookingDetails = this.filterDetails.filter((booking)=>{
        return booking.status === 'cancelled'
      })
    }else if(type === 'Mentor cancelled'){
      this.BookingDetails = this.filterDetails.filter((booking)=>{
        return booking.status === 'Mentor cancelled'
      })
    }
  }
  
}
