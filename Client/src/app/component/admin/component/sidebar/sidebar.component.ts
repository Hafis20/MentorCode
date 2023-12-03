import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit{
    constructor(private router:Router){}

    ngOnInit(): void {
      
    }
    
    // Logout the admin
    logout(){
      window.localStorage.removeItem('adminToken');
      this.router.navigate(['/admin/login']);
    }
}
