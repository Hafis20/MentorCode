import { Component, EventEmitter, Input, Output } from '@angular/core';
import { bookingOptions, userOptions } from './filter-data';

@Component({
  selector: 'filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css']
})
export class FilterComponent {
  @Input() from!:string;
  @Output() filterEvent:EventEmitter<string> = new EventEmitter<string>();

  userOptions:{option:string,value:string}[] = userOptions;
  bookingOptions:{option:string,value:string}[] = bookingOptions;


  selectedType:string = 'all';
  changedSelection(){
    this.filterEvent.emit(this.selectedType);
  }
}
