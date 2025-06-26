// client/src/pages/OpportunityDetails.tsx

import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { VolunteerOpportunity } from '@shared/types/VolunteerOpportunity';

function OpportunityDetails() {
  const { id } = useParams<{ id: string }>(); // Get the ID from the URL
  const [opportunity, setOpportunity] = useState<VolunteerOpportunity | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch(`http://localhost:3000/opportunities/${id}`)
      .then(res => {
        if (!res.ok) {
          throw new Error('Opportunity not found');
        }
        return res.json();
      })
      .then(data => {
        setOpportunity(data);
        setError(null);
      })
      .catch(err => {
        setError(err.message);
        setOpportunity(null);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [id]); // Re-run effect if the ID in the URL changes

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!opportunity) return <div>Opportunity details not available.</div>;

  return (
    <div>
      <h1>{opportunity.title}</h1>
      <p><strong>Category:</strong> {opportunity.category}</p>
      <p><strong>Location:</strong> {opportunity.location}</p>
      <p><strong>Date:</strong> {new Date(opportunity.date).toLocaleDateString()}</p>
      <hr />
      <p>{opportunity.description}</p>
      <br />
      <Link to="/">← Back to List</Link>
    </div>
  );
}

export default OpportunityDetails;