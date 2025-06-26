// client/src/pages/HomePage.tsx (Final Version)

import { VolunteerOpportunity } from '@shared/types/VolunteerOpportunity';
import OpportunityList from '../components/OpportunityList';

// A hardcoded list of categories for the filter dropdown
const CATEGORIES = ["Environment", "Education", "Health", "Community", "Animals"];

interface HomePageProps {
  search: string;
  setSearch: (search: string) => void;
  category: string;
  setCategory: (category: string) => void;
  opportunities: VolunteerOpportunity[];
  loading: boolean;
  onDelete: (id: number) => void;
}

function HomePage({ search, setSearch, category, setCategory, opportunities, loading, onDelete }: HomePageProps) {
  return (
    <div>
      <h1>Find Your Opportunity</h1>
      <div className="filters-container">
        <input
          type="text"
          placeholder="Search by keyword..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="search-input"
        />
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="category-select"
        >
          <option value="">All Categories</option>
          {CATEGORIES.map(cat => <option key={cat} value={cat}>{cat}</option>)}
        </select>
      </div>

      <hr />
      
      {}
      {loading ? (
        <p>Loading opportunities...</p>
      ) : (
        <OpportunityList opportunities={opportunities} onDelete={onDelete} />
      )}
    </div>
  );
}

export default HomePage;