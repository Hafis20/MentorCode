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
  tableHeaders: string[] = [
    'Name',
    'Email',
    'Mobile',
    'Status',
    'Experience',
    'Action',
  ];
  mentors!: MentorData[];
  constructor(
    private service: AdminService,
    private showMessage: MessageToastrService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.service.getAllMentors().subscribe({
      next: (response) => {
        this.mentors = response;   // Setting the data into the global variable
      },
      error: (error) => {
        const errorMessage = error.error.message;
        if (error.status === 401 && errorMessage === 'Unauthorized') {  // Error handled which is not authorized
          this.showMessage.showErrorToastr('Unauthorized Admin');
          localStorage.removeItem('adminToken');
          this.router.navigate(['/login']);
        } else {
          this.showMessage.showErrorToastr(errorMessage);
        }
      },
    });
  }

  block(id:string){
    console.log('From Mentor side',id)
  }
}
