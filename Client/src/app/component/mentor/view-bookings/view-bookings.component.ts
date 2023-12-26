import { Component, OnInit } from '@angular/core';
import { MenteeSlotAction, MentorBookingDetails } from 'src/app/model/bookingsModel';
import { MentorSlotService } from 'src/app/services/mentor-slot.service';
import { MessageToastrService } from 'src/app/services/message-toastr.service';

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
    'Action',
  ]

  BookingDetails!:MentorBookingDetails[];
    constructor(private service:MentorSlotService,private showMessage:MessageToastrService){}

    ngOnInit(): void {
      this.getBookedSlots()
    }

    getBookedSlots(){
      this.service.getBookedSlots().subscribe({
        next:(response)=>{
          this.BookingDetails = response
        },
        error:(error)=>{
          console.log(error.error.message);
        }
      })
    }

    cancelBooking(data:MenteeSlotAction){
      this.service.cancelMenteeBooking(data).subscribe({
        next:(response)=>{
          this.getBookedSlots();
          this.showMessage.showSuccessToastr(response.message);
        }
      })
    }
}
