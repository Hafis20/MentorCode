import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit{
  @Output() logoutEvent:EventEmitter<void> = new EventEmitter<void>();
    constructor(){}

    ngOnInit(): void {
      
    }

    logout(){
      this.logoutEvent.emit();
    }

}
