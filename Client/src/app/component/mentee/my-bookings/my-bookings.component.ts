import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import {
  MenteeBookingsDetails,
  MenteeSlotAction,
} from 'src/app/model/bookingsModel';
import { MenteeSlotService } from 'src/app/services/mentee-slot.service';
import { MessageToastrService } from 'src/app/services/message-toastr.service';
import { SocketService } from 'src/app/services/socket.service';
import { getMenteeInfo } from 'src/app/store/Mentee/mentee.selector';

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
    'Start Chat'
  ];

  BookingDetails!: MenteeBookingsDetails[]; // Setting and passing the data about booking details of the user
  filterDetails!: MenteeBookingsDetails[];
  email!:string;
  constructor(
    private service: MenteeSlotService,
    private showMessage: MessageToastrService,
    private router:Router,
    private socketService:SocketService,
    private store:Store,
  ) {}

  ngOnInit(): void {
    this.getMenteeBookingDetails();
    this.store.select(getMenteeInfo).subscribe({
      next:(response)=>{
        this.email = response.email;
      }
    })
  }

  getMenteeBookingDetails() {
    this.service.getMenteeBookingDetails().subscribe({
      // For getting the mentee booking details service
      next: (response) => {
        this.BookingDetails = response; // Setting the data of details
        this.filterDetails = response;
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

  // Filter the table according to the data status
  filter(type: string) {
    if (type === 'all') {
      this.BookingDetails = this.filterDetails;
    } else if (type === 'completed') {
      this.BookingDetails = this.filterDetails.filter((booking) => {
        return booking.status === 'completed';
      });
    } else if (type === 'pending') {
      this.BookingDetails = this.filterDetails.filter((booking) => {
        return booking.status === 'pending';
      });
    } else if (type === 'cancelled') {
      this.BookingDetails = this.filterDetails.filter((booking) => {
        return booking.status === 'cancelled';
      });
    } else if (type === 'Mentor cancelled') {
      this.BookingDetails = this.filterDetails.filter((booking) => {
        return booking.status === 'Mentor cancelled';
      });
    }
  }

  menteeVideoChat(roomId:string){
    // For joining the call
    this.socketService.menteeJoinRoom({email:this.email,room:roomId});
    this.router.navigate([`mentee/video-chat/${roomId}`],{state:{role:'mentee'}});
  }
}
