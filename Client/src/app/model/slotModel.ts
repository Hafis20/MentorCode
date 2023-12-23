// For booking the slot
export interface BookSlot{
   mentorId:string;
   fee:number;
   slotDate:string;
   slot_id:string;
   slotTime:string;
   payment_id:string;
}

// Showing menteeside slot type
export interface ShowSlots{
   time:string;
   is_booked:boolean;
}