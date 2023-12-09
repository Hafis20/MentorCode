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
      _id:string;
      name:string;
      email:string;
      role:string;
   }
}

// Create slot data model
export interface CreateSlot{
   date:Date;
   time:string;
}