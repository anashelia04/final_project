export interface VolunteerOpportunity {
  id: number;
  title: string;
  description: string;
  date: string;
  location: string;
  category: string;
  author: string; 
  volunteers: string[]; 
  volunteerLimit: number; 
}

