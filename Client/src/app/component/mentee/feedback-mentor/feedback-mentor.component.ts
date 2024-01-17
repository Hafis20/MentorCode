import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { MenteeService } from 'src/app/services/mentee.service';
import { MessageToastrService } from 'src/app/services/message-toastr.service';
import { getMenteeInfo } from 'src/app/store/Mentee/mentee.selector';

@Component({
  selector: 'feedback-modal',
  templateUrl: './feedback-mentor.component.html',
  styleUrls: ['./feedback-mentor.component.css']
})
export class FeedbackMentorComponent implements OnInit{

  @Input() MentorId!:string;
  MenteeId!:string;

  constructor(
    private fb:FormBuilder,
    private store:Store,
    private menteeSevice:MenteeService,
    private showMessage:MessageToastrService,
  ){}
  feedbackForm!:FormGroup;

  ngOnInit(): void {
     this.feedbackForm = this.fb.group({
       rate:['',Validators.required],
       comment:['',Validators.required],
     });
     this.store.select(getMenteeInfo).subscribe({
      next:(response)=>{
        this.MenteeId = response._id;
      }
     })
  }

  feedbackSubmit(){
    if(this.feedbackForm.invalid){

    }else{
      const data = {
        rate:this.feedbackForm.value.rate,
        comment:this.feedbackForm.value.comment,
        mentorId:this.MentorId,
        menteeId:this.MenteeId,
      }

      // Setting the form data
      this.menteeSevice.sendFeedback(data).subscribe({
        next:(response)=>{
          this.showMessage.showSuccessToastr(response.message);
        }
      })
    }
  }
}
