import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { Store } from "@ngrx/store";
import { getMentor, logoutMentor } from "src/app/store/Mentor/mentor.action";

@Component({
   selector:'app-mentor',
   templateUrl:'./mentor.component.html',
   styleUrls:['./mentor.component.css']   
})
export class MentorComponent implements OnInit{
   userType:string = 'mentor';
   constructor(private router:Router,private store:Store){}

   ngOnInit(): void {
      this.store.dispatch(getMentor());             // Dispatching the method for storing the mentor data in store
   }

   logout(){
      this.store.dispatch(logoutMentor());
      localStorage.removeItem('mentorToken');
      this.router.navigate(['/mentor/login']);
   }

   gotoProfile(){
      this.router.navigate(['/mentor/dashboard'])
   }
}