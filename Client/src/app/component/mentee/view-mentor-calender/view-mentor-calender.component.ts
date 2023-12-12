import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MenteeService } from 'src/app/services/mentee.service';

@Component({
  selector: 'view-mentor-calender',
  templateUrl: './view-mentor-calender.component.html',
  styleUrls: ['./view-mentor-calender.component.css'],
})
export class ViewMentorCalenderComponent implements OnInit {

  @Input() slotDates!:string[];
  @Output() dateEvent:EventEmitter<Date> = new EventEmitter<Date>();
  constructor(private service:MenteeService,private route:ActivatedRoute) {}

  ngOnInit(): void {
    this.initDate();
    this.getNoOfDays();
    
  }




  // Calender things
  MONTH_NAMES = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];
  DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  showDatepicker = false;
  datepickerValue!: string;
  month!: number; // !: mean promis it will not be null, and it will definitely be assigned
  year!: number;
  date!:number
  no_of_days = [] as number[];
  blankdays = [] as number[];


  

  initDate() {
    let today = new Date();
    this.month = today.getMonth();
    this.year = today.getFullYear();
    this.datepickerValue = new Date(
      this.year,
      this.month,
      today.getDate()
    ).toDateString();
  }

  isToday(date: any) {
    const today = new Date();
    const d = new Date(this.year, this.month, date);
    return today.toDateString() === d.toDateString() ? true : false;
  }

  getDateValue(date: number) {
    this.date = date
    let selectedDate = new Date(this.year, this.month, date);
    this.datepickerValue = selectedDate.toDateString();
    this.showDatepicker = false;
    this.dateEvent.emit(selectedDate);
  }

  getNoOfDays() {
    const daysInMonth = new Date(this.year, this.month + 1, 0).getDate();

    // find where to start calendar day of week
    let dayOfWeek = new Date(this.year, this.month).getDay();
    let blankdaysArray = [];
    for (var i = 1; i <= dayOfWeek; i++) {
      blankdaysArray.push(i);
    }

    let daysArray = [];
    for (var i = 1; i <= daysInMonth; i++) {
      daysArray.push(i);
    }

    this.blankdays = blankdaysArray;
    this.no_of_days = daysArray;
  }

  trackByIdentity = (index: number, item: any) => item;

  // Month changing
  changeMonth(monthoffset: number) {
    this.month += monthoffset;
    if (this.month === -1) {
      this.month = 11;
      this.year--;
    } else if (this.month === 12) {
      this.month = 0;
      this.year++;
    }
    this.getNoOfDays();
  }
}
