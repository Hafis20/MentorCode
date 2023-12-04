import { Component, OnInit } from '@angular/core';
import { MentorData } from 'src/app/model/adminModel';
import { AdminService } from '../../services/admin-service.service';
import { MessageToastrService } from 'src/app/services/message-toastr.service';

@Component({
  selector: 'app-list-mentors',
  templateUrl: './list-mentors.component.html',
  styleUrls: ['./list-mentors.component.css'],
})
export class ListMentorsComponent implements OnInit {
  tableHeaders: string[] = ['Name','Email', 'Mobile','Status','Experience','Action'];
  mentors!:MentorData[]; 
  constructor(private service:AdminService,private showMessage:MessageToastrService) {}

  ngOnInit(): void {
    this.service.getAllMentors().subscribe({
      next:(response)=>{
        this.mentors = response
      },
      error:(error)=>{
        this.showMessage.showErrorToastr(error.error.message);
      }
    })
  }
}
