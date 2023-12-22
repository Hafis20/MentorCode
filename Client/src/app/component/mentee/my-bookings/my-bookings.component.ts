import { Component, OnInit } from '@angular/core';
import { MenteeBookingsDetails } from 'src/app/model/bookingsModel';
import { MenteeSlotService } from 'src/app/services/mentee-slot.service';

@Component({
  selector: 'app-my-bookings',
  templateUrl: './my-bookings.component.html',
  styleUrls: ['./my-bookings.component.css']
})
export class MyBookingsComponent implements OnInit{
  TableHeaders:string[] = [  // Passing to the table component for showing the table header
    "Mentor",
    "Date",
    "Time",
    "Status",
    "Action"
  ]

  BookingDetails!:MenteeBookingsDetails[];   // Setting and passing the data about booking details of the user

  constructor(private service:MenteeSlotService){}

  ngOnInit(): void {
    this.getMenteeBookingDetails();
  }

  getMenteeBookingDetails(){
    this.service.getMenteeBookingDetails().subscribe({    // For getting the mentee booking details service
      next:(response)=>{
        this.BookingDetails = response;  // Setting the data of details
      }
    })
  }
  completeAction(data:object){
    this.service.completeMentorShip(data).subscribe({
      next:(response)=>{
        console.log(response);
        this.getMenteeBookingDetails();
      }
    })
  }
}
