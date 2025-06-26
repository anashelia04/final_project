import { Link } from 'react-router-dom';
import { VolunteerOpportunity } from '@shared/types/VolunteerOpportunity';

interface OpportunityCardProps {
  opportunity: VolunteerOpportunity;
  onDelete: (id: number) => void;
}

function OpportunityCard({ opportunity, onDelete }: OpportunityCardProps) {
  return (
    <li className="opportunity-list-item">
      <Link to={`/opportunities/${opportunity.id}`}>
        <strong>{opportunity.title}</strong> – {opportunity.location} ({opportunity.date})
      </Link>
      <button onClick={() => onDelete(opportunity.id)} className="btn btn-danger">
        Delete
      </button>
    </li>
  );
}

export default OpportunityCard;