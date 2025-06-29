import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { VolunteerOpportunity } from '../../../shared/types/VolunteerOpportunity';
import { useAuth } from '../context/AuthContext';
import OpportunityList from '../components/OpportunityList'; 

interface DashboardData {
  created: VolunteerOpportunity[];
  joined: VolunteerOpportunity[];
}

const DashboardPage = () => {
  const { user } = useAuth();
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await axios.get<DashboardData>('/api/users/me/dashboard');
      setData(response.data);
    } catch (err) {
      setError('Failed to load dashboard data.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);


  const handleLeave = async (opportunityId: number) => {
    if (!window.confirm("Are you sure you want to leave this opportunity?")) return;

    try {
      await axios.delete(`/api/users/me/joined/${opportunityId}`);
      alert('You have successfully left the opportunity.');

      fetchData(); 
    } catch (err: any) {
      alert(`Error: ${err.response?.data?.error || 'Could not leave opportunity.'}`);
    }
  };

  if (loading) return <div>Loading your dashboard...</div>;
  if (error) return <div className="error-message">{error}</div>;

  return (
    <div>
      <h1>Welcome, {user?.username}!</h1>
      <p>This is your personal dashboard. Here you can manage the opportunities you've created and track the ones you've joined.</p>
      
      <hr style={{ margin: '2rem 0' }} />

      <section>
        <h2>Opportunities I've Created</h2>
        {data?.created && data.created.length > 0 ? (

          <OpportunityList opportunities={data.created} onDelete={() => {}} />
        ) : (
          <p>You have not created any opportunities yet. <a href="/add-opportunity">Post one now!</a></p>
        )}
      </section>

      <hr style={{ margin: '2rem 0' }} />

      <section>
        <h2>Opportunities I've Joined</h2>
        {data?.joined && data.joined.length > 0 ? (
          <ul>
            {data.joined.map(opp => (
              <li key={opp.id} className="opportunity-list-item">
                <a href={`/opportunities/${opp.id}`} style={{flexGrow: 1}}>
                    <strong>{opp.title}</strong> - Posted by {opp.author}
                </a>
                <button onClick={() => handleLeave(opp.id)} className="btn">Un-join</button>
              </li>
            ))}
          </ul>
        ) : (
          <p>You have not joined any opportunities. <a href="/">Find one now!</a></p>
        )}
      </section>
    </div>
  );
};

export default DashboardPage;