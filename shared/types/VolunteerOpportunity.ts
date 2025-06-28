export interface VolunteerOpportunity {
  id: number;
  title: string;
  description: string;
  date: string;
  location: string;
  category: string;
  username: string;
  password?: string;
  author: string; 
  volunteers: string[];
}