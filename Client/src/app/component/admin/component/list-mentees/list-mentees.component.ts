import { Component, OnInit } from '@angular/core';
import { MenteeData, MentorData } from 'src/app/model/adminModel';
import { AdminService } from '../../services/admin-service.service';
import { MessageToastrService } from 'src/app/services/message-toastr.service';

@Component({
  selector: 'app-list-mentees',
  templateUrl: './list-mentees.component.html',
  styleUrls: ['./list-mentees.component.css'],
})
export class ListMenteesComponent implements OnInit {
  tableHeaders:string[] = ['Name','Email','Mobile','Status','Action'];
  mentees!:MenteeData[];
  user:string = 'mentee';
  constructor(private service:AdminService,private showMessage:MessageToastrService){}

  ngOnInit(): void {
    this.service.getAllMentees().subscribe({
      next:(response)=>{
        this.mentees = response;
      },
      error:(error)=>{
        this.showMessage.showErrorToastr(error.error.message);
      }
    })
  }
}
