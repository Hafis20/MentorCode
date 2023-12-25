import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GetMentorSlots, GetSlotByDate, SlotModel, SlotResponse } from '../model/mentorModel';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { MenteeSlotAction, MentorBookingDetails } from '../model/bookingsModel';
import { HttpResponseModel } from '../model/commonModel';

@Injectable({
  providedIn: 'root'
})
export class MentorSlotService {

  constructor(private http:HttpClient) { }

   // mentor can create slots
  mentorCreateSlot(data:SlotModel):Observable<SlotResponse>{
    return this.http.post<SlotResponse>(`${environment.mentorslotURL}/createSlot`,data);
  }

  mentorDeleteSlot(data:SlotModel):Observable<SlotResponse>{
    return this.http.post<SlotResponse>(`${environment.mentorslotURL}/deleteSlot`,data);
  }

  // Click on a date take the slots from backend
  getSlotsByDate(data:GetSlotByDate):Observable<SlotResponse>{
    return this.http.post<SlotResponse>(`${environment.mentorslotURL}/getSlotsByDate`,data);
  }

  // Whenever the mentor took the calender we want to show the slots they created
  getSlotsOfMentor():Observable<GetMentorSlots>{
    return this.http.get<GetMentorSlots>(`${environment.mentorslotURL}/getSlotsOfMentor`);
  }

  // If any one booked the slots of the mentor it will shows in the mentor side
  getBookedSlots():Observable<MentorBookingDetails[]>{
    return this.http.get<MentorBookingDetails[]>(`${environment.mentorslotURL}/getBookedSlots`);
  }

  cancelMenteeBooking(data:MenteeSlotAction):Observable<HttpResponseModel>{
    return this.http.post<HttpResponseModel>(`${environment.mentorslotURL}/cancelMenteeBooking`,data);
  }
}
