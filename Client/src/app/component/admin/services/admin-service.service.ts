import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { MenteeData, MentorData } from 'src/app/model/adminModel';
import {
  HttpResponseModel,
  LoginModel,
  LoginResponseModel,
  UserInfo,
} from 'src/app/model/commonModel';
import { MessageToastrService } from 'src/app/services/message-toastr.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AdminService {
  constructor(
    private http: HttpClient,
    private showMessage: MessageToastrService,
    private router: Router
  ) {}

  // Checking the admin is loggedin or not
  checkAdminLoggedIn(): boolean {
    const adminLoggedIn = window.localStorage.getItem('adminToken');
    return !!adminLoggedIn;
  }

  // Giving the unauthorized error and navigating to login page function
  errorHandler(status: number, errMessage: string) {
    if (status === 401 && errMessage === 'Unauthorized') {
      this.showMessage.showErrorToastr('Unauthorized User');
      localStorage.removeItem('adminToken'); // Because they edit the token and try to use at that time we remove the token
      this.router.navigate(['/login']);
    } else {
      this.showMessage.showErrorToastr(errMessage);
    }
  }

  // Login admin
  login(data: LoginModel): Observable<LoginResponseModel> {
    return this.http.post<LoginResponseModel>(`${environment.adminURL}/login`,data);
  }

  // Getting all Mentees
  getAllMentees(): Observable<MenteeData[]> {
    return this.http.get<MenteeData[]>(`${environment.adminURL}/getAllMentees`);
  }

  // Getting all Mentors
  getAllMentors(): Observable<MentorData[]> {
    return this.http.get<MentorData[]>(`${environment.adminURL}/getAllMentors`);
  }

  // Block a mentee
  blockMentee(id: object): Observable<HttpResponseModel> {
    return this.http.patch<HttpResponseModel>(`${environment.adminURL}/blockMentee`,id);
  }

  // unblock a mentee
  unblockMentee(id:object):Observable<HttpResponseModel>{
    return this.http.patch<HttpResponseModel>(`${environment.adminURL}/unblockMentee`,id);
  }


  // Block a mentor
  blockMentor(id:object):Observable<HttpResponseModel>{
    return this.http.patch<HttpResponseModel>(`${environment.adminURL}/blockMentor`,id);
  }

  // Unblock a mentor
  unblockMentor(id:object):Observable<HttpResponseModel>{
    return this.http.patch<HttpResponseModel>(`${environment.adminURL}/unblockMentor`,id);

  }
}
