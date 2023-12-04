import { extend } from "jquery";

export interface AdminState{
   adminInfo:{
      name:string,
      role:string;
   }
}

// Showing data in admin side table

// Mentee Schema
export interface MenteeData{
   _id:string;
   name:string;
   email:string;
   mobile:string;
   is_blocked:boolean;
   is_verified:boolean;
   role:string;
}

// Mentor schema
export interface MentorData extends MenteeData {
   experience:string;
}