// client/src/pages/HomePage.tsx

import { Link } from 'react-router-dom';
import { VolunteerOpportunity } from '../types/VolunteerOpportunity';

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
      
      {/* Task 19: Add a link to navigate to the Add Opportunity page */}
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
          <li key={opp.id} style={{ marginBottom: '10px' }}>
            
            {/* Task 18: Each opportunity title is a link to its details page */}
            <Link to={`/opportunities/${opp.id}`}>
              <strong>{opp.title}</strong> – {opp.location} ({opp.date})
            </Link>

            {/* Task 21: Add a delete button for each opportunity */}
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
      
      {/* A simple message if the filter results in no items */}
      {filtered.length === 0 && <p>No opportunities match your search.</p>}
    </div>
  );
}

export default HomePage;