import { Component, OnInit } from '@angular/core';
import { Bookings } from 'src/app/model/bookingsModel';
import { AdminService } from '../../services/admin-service.service';

@Component({
  selector: 'app-list-bookings',
  templateUrl: './list-bookings.component.html',
  styleUrls: ['./list-bookings.component.css']
})
export class ListBookingsComponent implements OnInit{

  tableHeaders: string[] = ['Mentor Name', 'Mentee Name','Date', 'Time','Fee', 'Status'];
  bookingDetails!:Bookings[];
  filterBookingDetails !:Bookings[];
  totalData!:number;

  constructor(private service:AdminService){}

  ngOnInit(): void {
    this.service.getBookingDetails().subscribe({
      next:(response)=>{
        this.bookingDetails = response;
        this.filterBookingDetails = response;
        this.totalData = response.length;
      }
    })
  }

  filter(text:string){
    if(text === 'all'){
      this.bookingDetails = this.filterBookingDetails;
    }else if(text === 'pending'){
      this.bookingDetails = this.filterBookingDetails.filter((booking)=>{
        return booking.details.status === 'pending';
      });
    }else if(text === 'Mentor cancelled'){
      this.bookingDetails = this.filterBookingDetails.filter((booking)=>{
        return booking.details.status === 'Mentor cancelled';
      });
    }else if(text === 'completed'){
      this.bookingDetails = this.filterBookingDetails.filter((booking)=>{
        return booking.details.status === 'completed';
      });
    }else if(text === 'cancelled'){
      this.bookingDetails = this.filterBookingDetails.filter((booking)=>{
        return booking.details.status === 'cancelled';
      });
    }
    this.totalData = this.bookingDetails.length;
  }
}
