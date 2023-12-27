import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'filter',
  templateUrl: './filter-bar.component.html',
  styleUrls: ['./filter-bar.component.css']
})
export class FilterBarComponent {
  selectedType:string = 'all';
  @Output() filterEvent:EventEmitter<string> = new EventEmitter<string>();


  changedSelection(){
    this.filterEvent.emit(this.selectedType);
  }
}
