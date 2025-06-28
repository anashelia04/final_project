import { opportunities as initialData } from '../data';
import { VolunteerOpportunity } from '../../shared/types/VolunteerOpportunity';

let opportunities: VolunteerOpportunity[] = [...initialData];

type CreateOpportunityData = Omit<VolunteerOpportunity, 'id' | 'author' | 'volunteers'>;

export const getAllOpportunities = (): VolunteerOpportunity[] => {
  return opportunities;
};

export const getOpportunityById = (id: number): VolunteerOpportunity | undefined => {
  return opportunities.find(opp => opp.id === id);
};

export const createOpportunity = (data: CreateOpportunityData, authorUsername: string): VolunteerOpportunity => {
  const newOpportunity: VolunteerOpportunity = {
    id: Date.now(), 
    ...data,
    author: authorUsername, 
    volunteers: [], 
  };
  opportunities.push(newOpportunity);
  return newOpportunity;
};

export const joinOpportunity = (opportunityId: number, username: string): { success: boolean, message: string, data?: VolunteerOpportunity } => {
  const opportunity = getOpportunityById(opportunityId);

  if (!opportunity) {
    return { success: false, message: "Opportunity not found." };
  }

  if (opportunity.volunteers.includes(username)) {
    return { success: false, message: "You have already joined this opportunity." };
  }
  
  if (opportunity.volunteers.length >= opportunity.volunteerLimit) {
    return { success: false, message: "This opportunity is full." };
  }

  opportunity.volunteers.push(username);
  return { success: true, message: "Successfully joined!", data: opportunity };
};


export const updateOpportunity = (id: number, data: Partial<VolunteerOpportunity>): VolunteerOpportunity | null => {
  const index = opportunities.findIndex(opp => opp.id === id);
  if (index === -1) {
    return null;
  }
  opportunities[index] = { ...opportunities[index], ...data };
  return opportunities[index];
};

export const deleteOpportunity = (id: number): boolean => {
  const index = opportunities.findIndex(opp => opp.id === id);
  if (index === -1) {
    return false;
  }
  opportunities.splice(index, 1);
  return true;
};