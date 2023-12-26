import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { ListMentorsHomeOfMentee } from 'src/app/model/menteeModel';

@Component({
  selector: 'cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.css'],
})
export class CardsComponent implements OnInit, OnChanges{
  @Input() mentorDetails!: ListMentorsHomeOfMentee[];
  constructor() {}

  ngOnInit(): void {}


  ngOnChanges(changes: SimpleChanges): void {
    if(changes['mentorDetails']){
      this.mentorDetails = this.mentorDetails;
    }
  }
  
}
