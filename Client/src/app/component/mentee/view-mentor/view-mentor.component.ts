import { Component, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import {
  ListMentorsHomeOfMentee,
} from 'src/app/model/menteeModel';
import { GetMentorSlots } from 'src/app/model/mentorModel';
import { BookSlot, ShowSlots } from 'src/app/model/slotModel';
import { MenteeSlotService } from 'src/app/services/mentee-slot.service';
import { MenteeService } from 'src/app/services/mentee.service';
import { MessageToastrService } from 'src/app/services/message-toastr.service';
import { PaymentService } from 'src/app/services/payment.service';
import { getMentee } from 'src/app/store/Mentee/mentee.action';
import { getMenteeInfo } from 'src/app/store/Mentee/mentee.selector';

declare var Razorpay:any;

@Component({
  selector: 'view-mentor',
  templateUrl: './view-mentor.component.html',
  styleUrls: ['./view-mentor.component.css'],
})
export class ViewMentorComponent implements OnInit, OnDestroy {
  userType: string = 'mentee';
  mentorDetails!: ListMentorsHomeOfMentee;
  slotDates!: string[];
  calenderResponse!: GetMentorSlots;
  slotTimes!: ShowSlots[];
  currentDate!: Date;
  mentorId!: string;
  menteeId!:string;
  bookedDates!:string[];
  slot_id!:string;
  slotTime!:string;
  feedbackBtnEnable:boolean = false;


  // Subscription
  getMentorSub$!:Subscription;
  menteeCompletedSessionSub$!:Subscription;

  // Rating and command modal
  modalOpen:boolean = false;

  constructor(
    private route: ActivatedRoute,
    private service: MenteeService,
    private store: Store,
    private slotService: MenteeSlotService,
    private paymentService:PaymentService,
    private showMessage: MessageToastrService
  ) {}

  ngOnInit(): void {
    this.currentDate = new Date();
    this.mentorId = this.route.snapshot.paramMap.get('id') as string;
    this.getMentorSub$ = this.service.getMentor(this.mentorId).subscribe({
      next: (response) => {
        this.mentorDetails = response[0];
      },
      error:error=>{
        this.showMessage.showErrorToastr(error.error.message);
      }
    });

    this.calenderData();  // For getting the data into the calender;
    // Dispatch an action for getting menteee data in to the store
    this.store.dispatch(getMentee());
    this.menteeOnceCompleted();
  }


  calenderData(){
    this.service.getMentorSlots(this.mentorId).subscribe({
      next: (response) => {
        this.slotDates = response.response.map((doc)=>doc.slot_date);   // which shows the mentor available slots
        this.calenderResponse = response;
        this.slotsOfTheDay(this.currentDate);
        this.bookedDates = response.response
        .filter((mentorSlotDate) => mentorSlotDate.slots.every((slot) => slot.is_booked))
        .map((mentorSlotDate) => mentorSlotDate.slot_date);
      },
      error:error=>{
        this.showMessage.showErrorToastr(error.error.message);
      }
    });
  }

  slotsOfTheDay(date: Date) {
    const day = date.toDateString();
    this.currentDate = date;
    const dateTime = this.calenderResponse.response.find((doc)=>doc.slot_date === day);
     this.slotTimes = dateTime?.slots  as ShowSlots[] // Passing the data in to cards of slot
  }

  bookingTimePayment(data:any) {    // For booking
    this.slot_id = data.slot_id;
    this.slotTime = data.slotTime;
    
    this.paymentService.bookingPayment({fee:this.mentorDetails.fee}).subscribe({   // For payment 
      next:(response)=>{
        this.razorpayPopUp(response);
      },
      error:(error)=>{
        alert(error.message);
        console.log(error.message)
      }
    })
    
  }

  razorpayPopUp(res:any){
    const RazorpayOptions = {
      description:'Mentor code Razorpay payment',
      currency:'INR',
      amount:res.fee,
      name:'MentorCode',
      key:res.key_id,
      order_id:res.order_id,
      image:'https://imgs.search.brave.com/bmhZt0Gh9CjW_Wk8CCob0T2V4PS_bHQYW3lfF_Ptlso/rs:fit:500:0:0/g:ce/aHR0cHM6Ly90My5m/dGNkbi5uZXQvanBn/LzA0LzM3LzM1LzA2/LzM2MF9GXzQzNzM1/MDY3Nl85Y1VibE1k/N29zNnNrZzA0VmE1/dUhhTWY1VFRaaEhX/Zy5qcGc',
      prefill:{
        name:'Hafis',
        email:'hafis@gmail.com',
        phone:'8585858585'
      },
      theme:{
        color:'#6466e3'
      },
      modal:{
        ondismiss:()=>{
          this.showMessage.showWarningToastr('Payment Failed');
        }
      },
      handler:this.paymentSuccess.bind(this)
    }
    const rpz = new Razorpay(RazorpayOptions);
    rpz.open()
  }

  paymentSuccess(options:any){
     const data:BookSlot = {
      mentorId: this.mentorId,
      fee:this.mentorDetails.fee,
      payment_id:options.razorpay_payment_id,
      slotDate: this.currentDate.toDateString(),
      slot_id: this.slot_id,
      slotTime:this.slotTime,
    };
    this.slotService.bookSlot(data).subscribe({
      next:(response)=>{
        console.log(response);
        this.calenderData();     // For refreshing the calender data
        this.slotsOfTheDay(this.currentDate);  // Passing the this.current date times into the slot component
        this.showMessage.showSuccessToastr(response.message);
      },
      error:error=>{
        this.showMessage.showErrorToastr(error.error.message);
      }
    })
  }

  // Modal toggling
  toggleModal(){
    this.modalOpen = !this.modalOpen;
  }


  // Mentee Once completed for the particular mentor... This is for showing feedback report button
  menteeOnceCompleted():void{
    this.store.select(getMenteeInfo).subscribe({
      next:(response)=>{
        this.menteeId = response._id;

        // Backend calling
       if(this.menteeId){
        const data = {
          mentorId:this.mentorId,
          menteeId:this.menteeId,
        }
        // console.log(data,'ddddddddddddaaaaaaaaaaaatttttttttqaaaaaaaaaa');

        // Checking once mentee took consultancy
        this.menteeCompletedSessionSub$ = this.service.menteeOnceCompletedSession(data).subscribe({
          next:(response)=>{
            this.feedbackBtnEnable = response.btnEnable;
          }
        })
       }
      }
    })
   
  }

  ngOnDestroy(): void {
    this.getMentorSub$.unsubscribe();
    this.menteeCompletedSessionSub$.unsubscribe();
  }
}
