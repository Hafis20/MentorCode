import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { MenteeBookingsDetails } from 'src/app/model/bookingsModel';

@Component({
  selector: 'shared-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit, OnChanges{

  @Input() TableHeaders!:string[]        // For reciving the table headers
  @Input() BookingDetails!:MenteeBookingsDetails[];
    constructor(){}

    ngOnInit(): void {
      console.log(this.BookingDetails)
    }

    ngOnChanges(changes: SimpleChanges): void {
      if(changes['BookingDetails']){
        this.BookingDetails = this.BookingDetails;
        console.log(this.BookingDetails);
      }
    }
}
