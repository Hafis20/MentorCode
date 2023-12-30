// Mentor register model
export interface MentorModel {
  name: string;
  email: string;
  password: string;
  mobile: string;
  experience: string;
}

// State model
export interface MentorState {
  mentorInfo: {
    _id: string;
    name: string;
    email: string;
    image:string;
    role: string;
  };
}

// Create slot data model
export interface SlotModel {
  mentorId: string;
  date: Date;
  time: string;
}


// Slot from db by date fetching
export interface GetSlotByDate {
  mentorId: string;
  date: Date;
}

// Get the date array from db for the mentor calender
export interface GetMentorSlots {
  message: string;
  response: [
    {
      slot_date: string;
      slots: [
        {
          time: string;
          is_booked: boolean;
        }
      ];
    }
  ];
}


//Response model of slot creationg 201
export interface SlotResponse {
  message: string;
  response: {
    slot_date: string;
    slots: [
      {
        time: string;
        is_booked: boolean;
      }
    ];
  };
}

// Mentor profile data model
export interface MentorProfile {
  skills: string[]; 
  about:string;
  mentor_id?: string;
  name: string;
  experience: string;
  image: string;
  mobile: string;
  fee: number; 
}

// Get statistics on mentor dashboard
export interface GetStatistics{
  totalSessions:number;
}