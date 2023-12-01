// Mentee register model
export interface MenteeModel{
   name:string;
   mobile:string;
   email:string;
   password:string;
}

// Store setting
export interface MenteeInfo{
   name:string;
   mobile:string;
   email:string;
   role:string;
}

// Mentee state format in ngrx
export interface MenteeState{
   menteeInfo:{
      name:string,
      mobile:string;
      email:string;
      role:string;
   }
}

// Simple http request
export interface HttpResponseModel{
   message:string;
   error:string;
}

// Otp validation data style
export interface ValidateOtpModel{
   email:string;
   otp:string;
}

// Login data passing form
export interface LoginModel{
   email:string;
   password:string;
}

// Getting data when login success
export interface LoginResponseModel{
   accessToken:string;
   accessedMentee:MenteeInfo;
   message:string;
}