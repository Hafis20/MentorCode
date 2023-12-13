// For booking the slot
export interface BookSlot{
   mentorId:string;
   slotDate:string;
   slotTime:string;
}

// Showing menteeside slot type
export interface MenteeShowSlots{
   time:string;
   is_booked:boolean;
}