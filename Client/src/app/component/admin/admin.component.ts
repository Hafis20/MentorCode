import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { getAdmin } from './store/admin.action';

@Component({
   selector:'app-admin',
   templateUrl:'./admin.component.html',
   styleUrls:['./admin.component.css']
})
export class AdminComponent implements OnInit{
   isLoggedIn=true;

   constructor(private store:Store){}
   ngOnInit(): void {
      this.store.dispatch(getAdmin());  // Dispatching the data for store the data in ngrx store
   }
}