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
  currentUsers!:ListMentorsHomeOfMentee[];
  searchList!:ListMentorsHomeOfMentee[];
  currentPage:number = 1;
  totalMentors!:number;
  itemsPerPage:number = 3;
    constructor(private router:Router,private service:MenteeService,private showMessage:MessageToastrService){}

    ngOnInit(): void {
      this.service.getAvaliableMentors().subscribe({
        next:(response)=>{
          this.mentorsList = response;
          this.totalMentors = response.length;
          this.searchList = response;
          this.currentUsers = this.showMentorForMentee();
          
        },
        error:(error)=>{
          this.showMessage.showErrorToastr(error.error.message);
        }
      })
    }

    gotoProfile(){
      this.router.navigate(['/mentee/dashboard']);
    }
    
    // Searching a mentor
    searchMentor(value:string){
      // this.currentUsers = this.searchList.filter((mentor)=>{
      //   return mentor.skills.some((skill)=>skill.toLowerCase() === value.toLowerCase());
      // })
    }

    changePage(page:number){
      this.currentPage = page;
      this.currentUsers = this.showMentorForMentee();
    }

    showMentorForMentee(): ListMentorsHomeOfMentee[] {
      if (this.mentorsList) {
        const startIndex = (this.currentPage - 1) * this.itemsPerPage;
        const endIndex = startIndex + this.itemsPerPage;
        return this.mentorsList.slice(startIndex, endIndex);
      } else {
        return [];
      }
    }
}
