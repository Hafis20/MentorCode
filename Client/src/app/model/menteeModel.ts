
export interface MenteeModel{
   name:string;
   mobile:string;
   email:string;
   password:string;
}

export interface HttpResponseModel{
   message:string;
   error:string;
}

export interface ValidateOtpModel{
   email:string;
   otp:string;
}

export interface LoginModel{
   email:string;
   password:string;
}