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
  totalMentees!:number;
  constructor(private service: AdminService,private showMessage:MessageToastrService) {}

  ngOnInit(): void {
    this.service.getAllMentees().subscribe({
      next: (response) => {
        this.mentees = response;  // Setting data into a global variable
        this.totalMentees = response.length;
      },
      error: (error) => {
        const errorMessage = error.error.message;
        this.service.errorHandler(error.status, errorMessage);  // Handling the 401 and such errors
      },
    });
  }

  // Blocking the mentee
  block(menteeId: string):void {  // Whenever an event occur in the child this button will call
    this.service.blockMentee({ menteeId }).subscribe({
      next: (response) => {
        this.showMessage.showSuccessToastr(response.message);
      },
      error: (error) => {
        const errorMessage = error.error.message;
        this.service.errorHandler(error.status, errorMessage);
      },
    });
  }

  // Unblocking the mentee
  unblock(menteeId:string):void{
    this.service.unblockMentee({menteeId}).subscribe({
      next:(response)=>{
        this.showMessage.showSuccessToastr(response.message);
      },
      error: (error) => {
        const errorMessage = error.error.message;
        this.service.errorHandler(error.status, errorMessage);
      },
    })
  }

}
