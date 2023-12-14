import { Component, OnInit } from '@angular/core';
import { MentorBookingDetails } from 'src/app/model/bookingsModel';
import { MentorSlotService } from 'src/app/services/mentor-slot.service';

@Component({
  selector: 'app-view-bookings',
  templateUrl: './view-bookings.component.html',
  styleUrls: ['./view-bookings.component.css']
})
export class ViewBookingsComponent implements OnInit{
  TableHeaders:string[]=[
    'Mentee Name',
    'Date',
    'Time',
    'Status',
  ]

  BookingDetails!:MentorBookingDetails[];
    constructor(private service:MentorSlotService){}

    ngOnInit(): void {
      this.service.getBookedSlots().subscribe({
        next:(response)=>{
          this.BookingDetails = response
        },
        error:(error)=>{
          console.log(error.error.message);
        }
      })
    }
}
