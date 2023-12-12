import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'view-slots',
  templateUrl: './view-slots.component.html',
  styleUrls: ['./view-slots.component.css']
})
export class ViewSlotsComponent implements OnInit, OnChanges{
    @Input() slotTimes!:any[];

    constructor(){}

    ngOnInit(): void {
    }

    ngOnChanges(changes:SimpleChanges){
      if(changes['slotTimes']){
        this.slotTimes = this.slotTimes;
      }
      console.log('Slot times', this.slotTimes)
    }
}
