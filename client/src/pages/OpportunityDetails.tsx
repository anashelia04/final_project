import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { VolunteerOpportunity } from '../../../shared/types/VolunteerOpportunity';
import { useAuth } from '../context/AuthContext';

function OpportunityDetails() {
  const { id } = useParams<{ id: string }>();
  const { user } = useAuth();
  const [opportunity, setOpportunity] = useState<VolunteerOpportunity | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchOpportunity = async () => {
      setLoading(true);
      try {
        const { data } = await axios.get(`/api/opportunities/${id}`);
        setOpportunity(data);
        setError(null);
      } catch (err: any) {
        setError(err.response?.data?.error || 'Opportunity not found');
        setOpportunity(null);
      } finally {
        setLoading(false);
      }
    };
    fetchOpportunity();
  }, [id]);

  const handleJoin = async () => {
    if (!opportunity) return;
    try {
      const { data: updatedOpportunity } = await axios.post(`/api/opportunities/${id}/join`);
      setOpportunity(updatedOpportunity);
      alert('Successfully joined!');
    } catch (err: any) {
      alert(`Error: ${err.response?.data?.error || 'Could not join at this time.'}`);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div className="error-message">Error: {error}</div>;
  if (!opportunity) return <div>Opportunity details not available.</div>;

  const isFull = opportunity.volunteers.length >= opportunity.volunteerLimit;
  const hasJoined = user ? opportunity.volunteers.includes(user.username) : false;

  const renderJoinButton = () => {
    if (!user) {
      return <p>Please <Link to="/login">log in</Link> to join this opportunity.</p>;
    }
    if (isFull && !hasJoined) {
      return <button className="btn" disabled>Opportunity Full</button>;
    }
    if (hasJoined) {
      return <button className="btn" disabled>You Have Joined</button>;
    }
    return <button className="btn btn-primary" onClick={handleJoin}>Join Opportunity</button>;
  };

  return (
    <div>
      <div className="details-card">
        <h1>{opportunity.title}</h1>
        <p><strong>Posted by:</strong> {opportunity.author}</p>
        <p><strong>Category:</strong> {opportunity.category}</p>
        <p><strong>Location:</strong> {opportunity.location}</p>
        <p><strong>Date:</strong> {new Date(opportunity.date).toLocaleDateString()}</p>
        <hr style={{ margin: '1rem 0' }}/>
        <p>{opportunity.description}</p>
        <hr style={{ margin: '1rem 0' }}/>
        <h3>Volunteers ({opportunity.volunteers.length} / {opportunity.volunteerLimit})</h3>
        {renderJoinButton()}
        
        <h4 style={{marginTop: '2rem'}}>Current Volunteers:</h4>
        {opportunity.volunteers.length > 0 ? (
          <ul>
            {opportunity.volunteers.map(name => <li key={name}>{name}</li>)}
          </ul>
        ) : (
          <p>Be the first to join!</p>
        )}
      </div>
      <br />
      <Link to="/">← Back to List</Link>
    </div>
  );
}

export default OpportunityDetails;