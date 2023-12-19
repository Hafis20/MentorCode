import { Component, OnInit, Input, OnChanges, SimpleChanges, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'view-slots',
  templateUrl: './view-slots.component.html',
  styleUrls: ['./view-slots.component.css']
})
export class ViewSlotsComponent implements OnInit, OnChanges{
    @Input() slotTimes!:any[];
    @Output() bookingTimeEvent:EventEmitter<string> = new EventEmitter<string>();

    constructor(){}

    ngOnInit(): void {
    }

    ngOnChanges(changes:SimpleChanges){
      if(changes['slotTimes']){
        this.slotTimes = this.slotTimes;
        // console.log('Its working')
      }
    }

    bookMentor(slotTime:string){
      this.bookingTimeEvent.emit(slotTime);
    }
}
