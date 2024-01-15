// Model for showing the user slot details
export interface MenteeBookingsDetails {
  mentorId: {
    image: string;
    name: string;
    experience: string;
    fee: number;
  };
  date: string;
  time: string;
  status: string;
  _id:string;
}


export interface MentorBookingDetails {
  details: {
    date: string;
    time: string;
    status: string;
    _id:string;
  };
  menteeDetails: {
    _id:string;
    name: string;
    image:string;
  };
}

export interface MenteeSlotAction{
  bookingId:string;
  status:'completed'|'cancelled'|'Mentor cancelled';
  menteeId?:string;  // This is for mentor side cancellation because we want to find which mentor slot is cancelled
}


// Admin side booking details
export interface Bookings {
  _id: string;
  details: {
    date: string;
    time: string;
    fee: number;
    status:'completed'|'cancelled'|'Mentor cancelled'|'pending';
  };
  MentorDetails: {
    name: string;
  };
  MenteeDetails: {
    name: string;
  };
}

// Feed back button enable or desable
export interface FeedbackBtn{
  btnEnable:boolean;
}