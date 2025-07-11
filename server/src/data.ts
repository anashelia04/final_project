import { VolunteerOpportunity } from '../../shared/types/VolunteerOpportunity';

export const opportunities: VolunteerOpportunity[] = [
  {
    id: 1,
    title: "Beach Cleanup",
    description: "Help clean the local beach.",
    date: "2025-06-10",
    location: "San Diego, CA",
    category: "Environment",
    author: 'organizer_alice',
    volunteers: ['volunteer_bob'], 
    volunteerLimit: 20 
  },
  {
    id: 2,
    title: "Tutoring Kids",
    description: "Provide homework help to kids in need.",
    date: "2025-06-15",
    location: "Atlanta, GA",
    category: "Education",
    author: 'organizer_alice', 
    volunteers: [], 
    volunteerLimit: 5 
  }
];