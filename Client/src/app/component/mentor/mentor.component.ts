import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";

@Component({
   selector:'app-mentor',
   templateUrl:'./mentor.component.html',
   styleUrls:['./mentor.component.css']   
})
export class MentorComponent implements OnInit{
   userType:string = 'mentor';
   constructor(private router:Router){}

   ngOnInit(): void {
      
   }

   logout(){
      localStorage.removeItem('mentorToken');
      this.router.navigate(['/mentor/login']);
   }

   gotoProfile(){
      this.router.navigate(['/mentor/'])
   }
}