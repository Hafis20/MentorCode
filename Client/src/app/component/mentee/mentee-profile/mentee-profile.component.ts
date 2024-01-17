import { Component, OnInit } from '@angular/core';
import { MenteeProfile } from 'src/app/model/menteeModel';
import { MenteeService } from 'src/app/services/mentee.service';

@Component({
  selector: 'app-mentee-profile',
  templateUrl: './mentee-profile.component.html',
  styleUrls: ['./mentee-profile.component.css']
})
export class MenteeProfileComponent implements OnInit{
  myProfileData!:MenteeProfile;
  editModal:boolean = false;
  constructor(private menteeSevice:MenteeService){}

  ngOnInit(): void {
    this.getMenteeProfile();
  }

  getMenteeProfile():void{
    this.menteeSevice.getMenteeProfile().subscribe({
      next:(response)=>{
        this.myProfileData = response;
        console.log(this.myProfileData);
      },
      error:(error)=>{
        console.error(error.error.message);
      }
    })
  }

  editModalToggle(){
    this.editModal = !this.editModal
  }

  editModalEventToggle(){
    this.editModal = !this.editModal
    this.getMenteeProfile();
  }
}
