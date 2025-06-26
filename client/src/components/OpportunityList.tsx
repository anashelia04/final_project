import { VolunteerOpportunity } from '@shared/types/VolunteerOpportunity';
import OpportunityCard from './OpportunityCard';

interface OpportunityListProps {
  opportunities: VolunteerOpportunity[];
  onDelete: (id: number) => void;
}

function OpportunityList({ opportunities, onDelete }: OpportunityListProps) {
  if (opportunities.length === 0) {
    return <p>No opportunities found. Try adjusting your search or filters.</p>;
  }

  return (
    <ul>
      {opportunities.map((opp) => (
        <OpportunityCard key={opp.id} opportunity={opp} onDelete={onDelete} />
      ))}
    </ul>
  );
}

export default OpportunityList;