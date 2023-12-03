import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class MessageToastrService {

  constructor(private toastr:ToastrService) { }

  // For showing the toastr message in succes senario
  showSuccessToastr(message:string){
    return this.toastr.success(message,'',{
      timeOut:2000,
      progressAnimation:'increasing',
      progressBar:true
    })
  }

  // For showing the toastr message in warning senario
  showWarningToastr(message:string){
    return this.toastr.warning(message,'',{
      timeOut:2000,
      progressAnimation:'increasing',
      progressBar:true,
    })
  }

  // For showing the toastr message in error senario
  showErrorToastr(message:string){
    return this.toastr.error(message,'',{
      timeOut:2000,
      progressAnimation:'increasing',
      progressBar:true
    })
  }
}
