import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { MenteeData, MentorData } from 'src/app/model/adminModel';

@Component({
  selector: 'shared-table',
  templateUrl: './shared-table.component.html',
  styleUrls: ['./shared-table.component.css'],
})
export class SharedTableComponent implements OnInit, OnChanges {
  currentPage: number = 1;
  itemsPerPage: number = 5; // Set your desired limit
  currentUsers!: (MentorData | MenteeData)[];

  // Getting data from the parent
  @Input() usersList!: (MentorData | MenteeData)[];
  @Input() tableHeaders!: string[];
  @Input() totalUsers!: number;

  // Sharing data to the parent
  @Output() blockUser: EventEmitter<string> = new EventEmitter<string>(); // Block user emitter
  @Output() unblockUser: EventEmitter<string> = new EventEmitter<string>(); // Unblock user emitter
  constructor() {}

  ngOnInit(): void {}

  ngOnChanges(changes: SimpleChanges) {
    if (changes['usersList']) {
      this.currentPage = 1;
      this.currentUsers = this.showUsersInTable();
    }
  }

  // Checking the user is mentor
  isMentor(user: any): user is MentorData {
    return user && user.role === 'mentor';
  }

  // Blocking the user
  block(userId: string) {
    this.changeStatusInTemplate(userId);
    this.blockUser.emit(userId);
  }

  // Unblocking the user
  unblock(userId: string) {
    this.changeStatusInTemplate(userId);
    this.unblockUser.emit(userId);
  }

  changeStatusInTemplate(userId: string): void {
    // This function is used to change the current status in the template
    this.usersList.map((user) => {
      //otherwise we want to refresh the page
      if (user._id === userId) {
        user.is_blocked = !user.is_blocked;
      }
    });
  }

  changePage(page: number) {
    this.currentPage = page;
    this.currentUsers = this.showUsersInTable();
  }

  showUsersInTable(): (MenteeData | MenteeData)[] {
    if (this.usersList) {
      const startIndex = (this.currentPage - 1) * this.itemsPerPage;
      const endIndex = startIndex + this.itemsPerPage;
      return this.usersList.slice(startIndex, endIndex);
    } else {
      return [];
    }
  }
}
