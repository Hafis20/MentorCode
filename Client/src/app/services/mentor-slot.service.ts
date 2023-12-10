import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GetSlotByDate, SlotModel, SlotResponse } from '../model/mentorModel';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

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
}
