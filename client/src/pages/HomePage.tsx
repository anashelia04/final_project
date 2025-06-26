// client/src/pages/HomePage.tsx

import { Link } from 'react-router-dom';
import { VolunteerOpportunity } from '@shared/types/VolunteerOpportunity';

// Define the props that this component receives from its parent (App.tsx)
interface HomePageProps {
  opportunities: VolunteerOpportunity[];
  search: string;
  setSearch: (search: string) => void;
  onDelete: (id: number) => void; // The delete handler function
}

function HomePage({ opportunities, search, setSearch, onDelete }: HomePageProps) {
  
  // Filter the list based on the search input
  const filtered = opportunities.filter((opp) =>
    opp.title.toLowerCase().includes(search.toLowerCase()) ||
    opp.description.toLowerCase().includes(search.toLowerCase())
  );

   return (
    <div>
      <h1>Volunteer Opportunities</h1>
      <Link to="/add" className="btn btn-primary"> {/* Add classes */}
        Add New Opportunity
      </Link>
      <hr style={{ margin: '1.5rem 0' }} />
      <input
        className="search-input" // Add class
        type="text"
        placeholder="Search..."
        // ... other props
      />
      <ul>
        {filtered.map((opp) => (
          <li key={opp.id} className="opportunity-list-item"> {/* Add class */}
            <Link to={`/opportunities/${opp.id}`}>
              <strong>{opp.title}</strong> – {opp.location} ({opp.date})
            </Link>
            <button onClick={() => onDelete(opp.id)} className="btn btn-danger"> {/* Add classes */}
              Delete
            </button>
          </li>
        ))}
      </ul>
      {/* ... no results message */}
    </div>
  );
}

export default HomePage;