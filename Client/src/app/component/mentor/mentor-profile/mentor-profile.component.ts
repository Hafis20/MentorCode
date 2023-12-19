import { Component, OnInit } from '@angular/core';
import { MentorService } from 'src/app/services/mentor.service';

@Component({
  selector: 'app-mentor-profile',
  templateUrl: './mentor-profile.component.html',
  styleUrls: ['./mentor-profile.component.css'],
})
export class MentorProfileComponent implements OnInit {
  constructor(private service:MentorService) {}
  ngOnInit(): void {
    this.service.getMentorProfile().subscribe({
      next:(response)=>{
        // console.log(response);
      }
    })
  }
}
