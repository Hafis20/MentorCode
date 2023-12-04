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
  constructor(
    private service: AdminService,
    private showMessage: MessageToastrService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.service.getAllMentees().subscribe({
      next: (response) => {
        this.mentees = response;
      },
      error: (error) => {
        const errorMessage = error.error.message;
        if (error.status === 401 && errorMessage === 'Unauthorized') {
          this.showMessage.showErrorToastr('Unauthorized User');
          localStorage.removeItem('adminToken');  // Because they edit the token and try to use at that time we remove the token
          this.router.navigate(['/login']);
        } else {
          this.showMessage.showErrorToastr(errorMessage);
        }
      },
    });
  }
}
