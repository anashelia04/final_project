import { Link } from 'react-router-dom';
import { VolunteerOpportunity } from '../types/VolunteerOpportunity';

interface HomePageProps {
  opportunities: VolunteerOpportunity[];
  search: string;
  setSearch: (search: string) => void;
}

function HomePage({ opportunities, search, setSearch }: HomePageProps) {
  const filtered = opportunities.filter((opp) =>
    opp.title.toLowerCase().includes(search.toLowerCase()) ||
    opp.description.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <h1>Volunteer Opportunities</h1>
      <Link to="/add">Add New Opportunity</Link>
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
          <li key={opp.id}>
            {/* Link each item to its details page */}
            <Link to={`/opportunities/${opp.id}`}>
              <strong>{opp.title}</strong> – {opp.location} ({opp.date})
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default HomePage;