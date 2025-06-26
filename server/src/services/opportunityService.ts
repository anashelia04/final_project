import { opportunities as initialData } from '../data';
import { VolunteerOpportunity } from '../types/VolunteerOpportunity'; 

let opportunities: VolunteerOpportunity[] = [...initialData];

export const getAllOpportunities = (): VolunteerOpportunity[] => {
  return opportunities;
};

export const getOpportunityById = (id: number): VolunteerOpportunity | undefined => {
  return opportunities.find(opp => opp.id === id);
};

export const createOpportunity = (data: Omit<VolunteerOpportunity, 'id'>): VolunteerOpportunity => {
  const newOpportunity: VolunteerOpportunity = {
    id: Date.now(),
    ...data
  };
  opportunities.push(newOpportunity);
  return newOpportunity;
};

export const updateOpportunity = (id: number, data: Partial<VolunteerOpportunity>): VolunteerOpportunity | null => {
  const index = opportunities.findIndex(opp => opp.id === id);
  if (index === -1) {
    return null; 
  }
  const updatedOpportunity = {
    ...opportunities[index],
    ...data,
    id: opportunities[index].id, 
  };
  opportunities[index] = updatedOpportunity;
  return updatedOpportunity;
};

export const deleteOpportunity = (id: number): boolean => {
  const index = opportunities.findIndex(opp => opp.id === id);
  if (index === -1) {
    return false; 
  }
  opportunities.splice(index, 1);
  return true;
};