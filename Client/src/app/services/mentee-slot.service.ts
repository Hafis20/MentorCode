import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BookSlot } from '../model/slotModel';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpResponseModel } from '../model/commonModel';
import { MenteeBookingsDetails } from '../model/bookingsModel';

@Injectable({
  providedIn: 'root'
})
export class MenteeSlotService {

  constructor(private http:HttpClient) { }

  // For booking the slot
  bookSlot(data:BookSlot):Observable<HttpResponseModel>{
    return this.http.post<HttpResponseModel>(`${environment.menteeslotURL}/bookSlot`,data);
  }

  // For getting booking details
  getMenteeBookingDetails():Observable<MenteeBookingsDetails[]>{
    return this.http.get<MenteeBookingsDetails[]>(`${environment.menteeslotURL}/getBookingDetails`);
  }
}
