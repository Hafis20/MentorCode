import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BookSlot } from '../model/slotModel';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MenteeSlotService {

  constructor(private http:HttpClient) { }

  // For booking the slot
  bookSlot(data:BookSlot):Observable<any>{
    return this.http.post<any>(`${environment.menteeslotURL}/bookSlot`,data);
  }
}
