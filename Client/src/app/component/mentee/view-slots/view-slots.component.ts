import { Component, OnInit, Input, OnChanges, SimpleChanges, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'view-slots',
  templateUrl: './view-slots.component.html',
  styleUrls: ['./view-slots.component.css']
})
export class ViewSlotsComponent implements OnInit, OnChanges{
    @Input() slotTimes!:any[];
    @Output() bookingTimeEvent:EventEmitter<object> = new EventEmitter<object>();

    constructor(){}

    ngOnInit(): void {
    }

    ngOnChanges(changes:SimpleChanges){
      if(changes['slotTimes']){
        this.slotTimes = this.slotTimes;
        // console.log('Its working')
      }
    }

    bookMentor(slot_id:string,slotTime:string){
      this.bookingTimeEvent.emit({slot_id,slotTime});
    }
}
