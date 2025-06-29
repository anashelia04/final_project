import { opportunities } from '../data'; 

export const getDashboardData = (username: string) => {

    const createdOpportunities = opportunities.filter(opp => opp.author === username);

    const joinedOpportunities = opportunities.filter(opp => opp.volunteers.includes(username));

    return {
        created: createdOpportunities,
        joined: joinedOpportunities,
    };
};


export const leaveOpportunity = (username: string, opportunityId: number): { success: boolean; message: string } => {
    const opportunity = opportunities.find(opp => opp.id === opportunityId);

    if (!opportunity) {
        return { success: false, message: "Opportunity not found." };
    }

    const volunteerIndex = opportunity.volunteers.indexOf(username);

    if (volunteerIndex > -1) {
        opportunity.volunteers.splice(volunteerIndex, 1); 
        return { success: true, message: "You have left the opportunity." };
    } else {
        return { success: false, message: "You were not joined to this opportunity." };
    }
};