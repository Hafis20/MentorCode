import { Component, OnInit, Input } from '@angular/core';
import { ListMentorsHomeOfMentee } from 'src/app/model/menteeModel';

@Component({
  selector: 'cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.css'],
})
export class CardsComponent implements OnInit {

  @Input() mentorDetails!:ListMentorsHomeOfMentee[];

  constructor() {}

  ngOnInit(): void {}

}
