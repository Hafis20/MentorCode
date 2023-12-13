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
}
