import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'admin-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit{

    @Input() isLoggedIn:boolean = false;
    constructor(){}

    ngOnInit(): void {
      
    }
}
