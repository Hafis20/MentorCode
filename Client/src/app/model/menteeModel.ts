// Mentee register model
export interface MenteeModel {
  name: string;
  mobile: string;
  email: string;
  password: string;
}

// Mentee state format in ngrx
export interface MenteeState {
  menteeInfo: {
    name: string;
    email: string;
    role: string;
    _id:string;
  };
}

// Admin side mentee listing
export interface MenteeList {
  _id: string;
  name: string;
  email: string;
  mobile: string;
  is_blocked: boolean;
}

// Mentee side home (find a mentor) Mentor data model
export interface ListMentorsHomeOfMentee {
  _id: string;
  name: string;
  experience: string;
  fee: number;
  image: string;
  skills:string[];
  about:string
}

// Slot model when we call depend on the user
export interface ShowMenteeCalenderData {
  slot_date: string;
  added_slots: [];
}

