import { Link } from 'react-router-dom';
import { VolunteerOpportunity } from '../types/VolunteerOpportunity';

interface HomePageProps {
  opportunities: VolunteerOpportunity[];
  search: string;
  setSearch: (search: string) => void;
  onDelete: (id: number) => void; 
}

function HomePage({ opportunities, search, setSearch, onDelete }: HomePageProps) {
  const filtered = opportunities.filter((opp) =>
    opp.title.toLowerCase().includes(search.toLowerCase()) ||
    opp.description.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <h1>Volunteer Opportunities</h1>
      <Link to="/add" style={{ display: 'inline-block', margin: '10px 0' }}>Add New Opportunity</Link>
      <hr />
      <input
        type="text"
        placeholder="Search..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{ margin: '20px 0', padding: '10px', width: '300px' }}
      />
      <ul>
        {filtered.map((opp) => (
          <li key={opp.id} style={{ marginBottom: '10px' }}>
            <Link to={`/opportunities/${opp.id}`}>
              <strong>{opp.title}</strong> – {opp.location} ({opp.date})
            </Link>
            {/* delete button later*/}
            <button 
              onClick={() => onDelete(opp.id)} 
              style={{ marginLeft: '10px', cursor: 'pointer' }}
            >
              Delete
            </button>
          </li>
        ))}
        {filtered.length === 0 && <p>No opportunities found.</p>}
      </ul>
    </div>
  );
}

export default HomePage;