import { Component, OnInit } from '@angular/core';
import { MenteeData, MentorData } from 'src/app/model/adminModel';
import { AdminService } from '../../services/admin-service.service';
import { MessageToastrService } from 'src/app/services/message-toastr.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list-mentees',
  templateUrl: './list-mentees.component.html',
  styleUrls: ['./list-mentees.component.css'],
})
export class ListMenteesComponent implements OnInit {
  tableHeaders: string[] = ['Name', 'Email', 'Mobile', 'Status', 'Action'];
  mentees!: MenteeData[];
  user: string = 'mentee';
  constructor(private service: AdminService,private showMessage:MessageToastrService) {}

  ngOnInit(): void {
    this.service.getAllMentees().subscribe({
      next: (response) => {
        this.mentees = response;  // Setting data into a global variable
      },
      error: (error) => {
        const errorMessage = error.error.message;
        this.service.errorHandler(error.status, errorMessage);  // Handling the 401 and such errors
      },
    });
  }

  block(id: string) {  // Whenever an event occur in the child this button will call
    this.service.blockMentee({ id }).subscribe({
      next: (response) => {
        this.showMessage.showSuccessToastr(response.message);
        this.ngOnInit()
      },
      error: (error) => {
        const errorMessage = error.error.message;
        this.service.errorHandler(error.status, errorMessage);
      },
    });
  }
}
