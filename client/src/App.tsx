import { useState, useEffect } from "react";
import { Routes, Route } from 'react-router-dom';
import { VolunteerOpportunity } from '@shared/types/VolunteerOpportunity';

// Import the page components
import HomePage from "./pages/HomePage";
import OpportunityDetails from "./pages/OpportunityDetails";
import AddOpportunity from "./pages/AddOpportunity";

function App() {
  const [opportunities, setOpportunities] = useState<VolunteerOpportunity[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true); // Add a loading state
  const [error, setError] = useState<string | null>(null);

  // Fetch all opportunities when the app component mounts
  useEffect(() => {
    fetch("http://localhost:3000/opportunities")
      .then((res) => {
        if (!res.ok) {
          throw new Error('Network response was not ok');
        }
        return res.json();
      })
      .then((data) => {
        setOpportunities(data);
        setError(null);
      })
      .catch(err => {
        console.error("Failed to fetch opportunities:", err);
        setError("Could not load data. Please ensure the backend server is running.");
      })
      .finally(() => {
        setLoading(false); // Set loading to false once fetch is complete
      });
  }, []); // Empty dependency array ensures this runs only once

  const handleDelete = (id: number) => {
    if (!window.confirm("Are you sure you want to delete this opportunity?")) {
      return;
    }

    fetch(`http://localhost:3000/opportunities/${id}`, {
      method: 'DELETE',
    })
    .then(res => {
      if (res.ok) {
        setOpportunities(prev => prev.filter(opp => opp.id !== id));
      } else {
        throw new Error('Failed to delete on the server.');
      }
    })
    .catch(err => {
      console.error(err);
      setError("Failed to delete opportunity. Please try again.");
    });
  };

  // Show a loading message while data is being fetched
  if (loading) {
    return <div>Loading opportunities...</div>;
  }

  return (
    <div className="container"> {/* Add this class */}
      {error && <p className="error-message">{error}</p>}
      <Routes>
        <Route 
          path="/" 
          element={
            <HomePage 
              opportunities={opportunities} 
              search={search} 
              setSearch={setSearch} 
              onDelete={handleDelete}
            />
          } 
        />
        <Route path="/opportunities/:id" element={<OpportunityDetails />} />
        <Route path="/add" element={<AddOpportunity />} />
      </Routes>
    </div>
  );
}

export default App;