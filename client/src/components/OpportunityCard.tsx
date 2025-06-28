import { Link } from 'react-router-dom';
import { VolunteerOpportunity } from '@shared/types/VolunteerOpportunity';
import { useAuth } from '../context/AuthContext';

interface OpportunityCardProps {
  opportunity: VolunteerOpportunity;
  onDelete: (id: number) => void;
}

function OpportunityCard({ opportunity, onDelete }: OpportunityCardProps) {
  const { user } = useAuth();
  
  // Only show delete button if a user is logged in AND they are the author.
  const canDelete = user && user.username === opportunity.author;

  return (
    <li className="opportunity-list-item">
      <Link to={`/opportunities/${opportunity.id}`} style={{textDecoration: 'none', color: 'inherit'}}>
        <div>
          <strong>{opportunity.title}</strong>
          <div>{opportunity.location} ({new Date(opportunity.date).toLocaleDateString()})</div>
          <div>Spots: {opportunity.volunteers.length} / {opportunity.volunteerLimit}</div>
        </div>
      </Link>
      {canDelete && (
        <button onClick={() => onDelete(opportunity.id)} className="btn btn-danger">
          Delete
        </button>
      )}
    </li>
  );
}

export default OpportunityCard;