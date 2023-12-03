// Mentor register model
export interface MentorModel{
   name:string;
   email:string;
   password:string;
   mobile:string;
   experience:string;
}

// State model
export interface MentorState{
   mentorInfo:{
      name:string;
      email:string;
      role:string;
   }
}