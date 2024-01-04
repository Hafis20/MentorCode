import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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
    'Start chat'
  ]

  BookingDetails!:MentorBookingDetails[];
  BookingDetailsCopy!:MentorBookingDetails[];

    constructor(
      private service:MentorSlotService,
      private showMessage:MessageToastrService,
      private router: Router
    ){}

    ngOnInit(): void {
      this.getBookedSlots()
    }

    getBookedSlots(){
      this.service.getBookedSlots().subscribe({
        next:(response)=>{
          this.BookingDetails = response
          this.BookingDetailsCopy = response;
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


    filterTable(type:string){
      if(type === 'all'){
        this.BookingDetails = this.BookingDetailsCopy;
      }else if(type === 'completed'){
        this.BookingDetails = this.BookingDetailsCopy.filter((booking)=>{
          return booking.details.status === 'completed'
        })
      }else if(type === 'pending'){
        this.BookingDetails = this.BookingDetailsCopy.filter((booking)=>{
          return booking.details.status === 'pending'
        })
      }else if(type === 'cancelled'){
        this.BookingDetails = this.BookingDetailsCopy.filter((booking)=>{
          return booking.details.status === 'cancelled'
        })
      }else if(type ==='Mentor cancelled'){
        this.BookingDetails = this.BookingDetailsCopy.filter((booking)=>{
          return booking.details.status === 'Mentor cancelled'
        })
      }
    }

    videoChat(){
      console.log('Chat')
      this.router.navigate(['mentor/video-chat']);
    }
}
