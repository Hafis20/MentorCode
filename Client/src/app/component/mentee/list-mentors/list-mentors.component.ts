import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ListMentorsHomeOfMentee } from 'src/app/model/menteeModel';
import { MenteeService } from 'src/app/services/mentee.service';
import { MessageToastrService } from 'src/app/services/message-toastr.service';

@Component({
  selector: 'app-list-mentors',
  templateUrl: './list-mentors.component.html',
  styleUrls: ['./list-mentors.component.css']
})
export class ListMentorsComponent implements OnInit{
  mentorsList!:ListMentorsHomeOfMentee[];
  searchList!:ListMentorsHomeOfMentee[];
    constructor(private router:Router,private service:MenteeService,private showMessage:MessageToastrService){}

    ngOnInit(): void {
      this.service.getAvaliableMentors().subscribe({
        next:(response)=>{
          this.mentorsList = response;
          this.searchList = response;
        },
        error:(error)=>{
          this.showMessage.showErrorToastr(error.error.message);
        }
      })
    }

    gotoProfile(){
      this.router.navigate(['/mentee/']);
    }
    
    // Searching a mentor
    searchMentor(value:string){
      // this.mentorsList = this.searchList.filter((mentor)=>{
      //   return mentor.skills.some((skill)=>skill.toLowerCase() === value.toLowerCase());
      // })
    }
}
