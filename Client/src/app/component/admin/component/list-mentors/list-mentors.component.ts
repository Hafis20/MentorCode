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
        this.service.errorHandler(error.status, errorMessage);
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

  searchText(searchText: string) {
    const searchTerm = searchText.toLowerCase().trim().replace(/\s+/g, ''); // Replace all spaces with an empty string
  
    this.mentors = this.searchingMentor.filter((mentor) =>
      mentor.name.toLowerCase().replace(/\s+/g, '').includes(searchTerm)
    );
  
    this.totalMentors = this.searchingMentor.filter((mentor) =>
      mentor.name.toLowerCase().replace(/\s+/g, '').includes(searchTerm)
    ).length;
  }

  // Filtering based on status
  // Filter the using status verified or not
  filter(status:string){
    if(status === 'verified'){ // Selecting the verified
      this.mentors = this.searchingMentor.filter((mentor)=>
      mentor.is_verified === true);
      this.totalMentors = this.searchingMentor.filter((mentor)=>
      mentor.is_verified === true).length;
    }else if(status === 'notverified'){  // Selection the not verified
      this.mentors = this.searchingMentor.filter((mentor)=>
      mentor.is_verified === false);
      this.totalMentors = this.searchingMentor.filter((mentor)=>
      mentor.is_verified === false).length;
    }else{
      this.mentors = this.searchingMentor;
      this.totalMentors = this.searchingMentor.length
    }
  }
  
}
