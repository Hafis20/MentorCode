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


// Store setting
export interface UserInfo{
   _id:string;
   name:string;
   email:string;
   image:string;
   role:string;
}

export interface AdminInfo{
   name:string;
   role:string;
}

// Getting data when login success
export interface LoginResponseModel{
   accessToken:string;
   accessedUser:UserInfo;
   message:string;
}