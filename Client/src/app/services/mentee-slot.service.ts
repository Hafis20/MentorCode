import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BookSlot } from '../model/slotModel';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpResponseModel } from '../model/commonModel';
import { MenteeBookingsDetails, MenteeSlotAction } from '../model/bookingsModel';

@Injectable({
  providedIn: 'root'
})
export class MenteeSlotService {

  constructor(private http:HttpClient) { }


  bookingPayment(fee:object):Observable<any>{
    return this.http.post(`${environment.menteeslotURL}/bookingPayment`,fee);
  }

  // For booking the slot
  bookSlot(data:BookSlot):Observable<HttpResponseModel>{
    return this.http.post<HttpResponseModel>(`${environment.menteeslotURL}/bookSlot`,data);
  }

  // For getting booking details
  getMenteeBookingDetails():Observable<MenteeBookingsDetails[]>{
    return this.http.get<MenteeBookingsDetails[]>(`${environment.menteeslotURL}/getBookingDetails`);
  }

  // Mentoring completed
  completeMentorShip(data:MenteeSlotAction):Observable<HttpResponseModel>{
    return this.http.post<HttpResponseModel>(`${environment.menteeslotURL}/completeMentorShip`,data);
  }

  // Mentor booking cancelled
  cancelMentorShip(data:MenteeSlotAction):Observable<HttpResponseModel>{
    return this.http.post<HttpResponseModel>(`${environment.menteeslotURL}/cancelMentorShip`,data);
  }
}
