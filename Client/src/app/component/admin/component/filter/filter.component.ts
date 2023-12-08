import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css']
})
export class FilterComponent {

  @Output() filterEvent:EventEmitter<string> = new EventEmitter<string>();

  selectedType:string = 'all';
  changedSelection(){
    this.filterEvent.emit(this.selectedType);
  }
}
