import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'searchbar',
  templateUrl: './searchbar.component.html',
  styleUrls: ['./searchbar.component.css'],
})
export class SearchbarComponent implements OnInit {
  
  @Output() searchEvent:EventEmitter<string> = new EventEmitter<string>();

  constructor() {}

  ngOnInit(): void {}

  searchText(text:string) {
    this.searchEvent.emit(text);
  }
}
