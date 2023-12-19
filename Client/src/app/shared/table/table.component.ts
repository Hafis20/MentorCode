import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { MenteeBookingsDetails, MentorBookingDetails } from 'src/app/model/bookingsModel';

@Component({
  selector: 'shared-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit, OnChanges{

  @Input() TableHeaders!:string[]        // For reciving the table headers
  @Input() MenteeBookingDetails!:MenteeBookingsDetails[];
  @Input() MentorBookingDetails!:MentorBookingDetails[];
    constructor(){}

    ngOnInit(): void {
      console.log(this.MenteeBookingDetails)
    }

    ngOnChanges(changes: SimpleChanges): void {
      if(changes['MenteeBookingDetails']){
        this.MenteeBookingDetails = this.MenteeBookingDetails;
        console.log(this.MenteeBookingDetails);
      }

      if(changes['MentorBookingDetails']){
        console.log(this.MentorBookingDetails)
      }
    }
}
