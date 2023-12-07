import { Component, OnInit } from '@angular/core';
import { MentorData } from 'src/app/model/adminModel';
import { AdminService } from '../../services/admin-service.service';
import { MessageToastrService } from 'src/app/services/message-toastr.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list-mentors',
  templateUrl: './list-mentors.component.html',
  styleUrls: ['./list-mentors.component.css'],
})
export class ListMentorsComponent implements OnInit {
  totalMentors!: number;
  tableHeaders: string[] = [
    'Name',
    'Email',
    'Mobile',
    'Status',
    'Experience',
    'Fee',
    'Action',
  ];
  mentors!: MentorData[];
  searchingMentor!: MentorData[];
  constructor(
    private service: AdminService,
    private showMessage: MessageToastrService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.service.getAllMentors().subscribe({
      next: (response) => {
        this.mentors = response; // Setting the data into the global variable
        this.searchingMentor = response;
        this.totalMentors = response.length;
      },
      error: (error) => {
        const errorMessage = error.error.message;
        if (error.status === 401 && errorMessage === 'Unauthorized') {
          // Error handled which is not authorized
          this.showMessage.showErrorToastr('Unauthorized Admin');
          localStorage.removeItem('adminToken');
          this.router.navigate(['/login']);
        } else {
          this.showMessage.showErrorToastr(errorMessage);
        }
      },
    });
  }

  // Blocking the mentor
  block(mentorId: string): void {
    // Whenever an event occur in the child this button will call
    this.service.blockMentor({ mentorId }).subscribe({
      next: (response) => {
        this.showMessage.showSuccessToastr(response.message);
      },
      error: (error) => {
        const errorMessage = error.error.message;
        this.service.errorHandler(error.status, errorMessage);
      },
    });
  }

  // Unblocking the mentor
  unblock(mentorId: string): void {
    this.service.unblockMentor({ mentorId }).subscribe({
      next: (response) => {
        this.showMessage.showSuccessToastr(response.message);
      },
      error: (error) => {
        const errorMessage = error.error.message;
        this.service.errorHandler(error.status, errorMessage);
      },
    });
  }

  searchText(text: string) {
    this.mentors = this.searchingMentor.filter((user) =>
      user.name.toLowerCase().includes(text.toLowerCase())
    );
    this.totalMentors = this.searchingMentor.filter(
      (user) => user.name.toLowerCase().includes(text.toLowerCase())
    ).length;
  }
}
