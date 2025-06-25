import { useState, useEffect } from "react";
import { Routes, Route } from 'react-router-dom';
import { VolunteerOpportunity } from "./types/VolunteerOpportunity";

import HomePage from "./pages/HomePage";
import OpportunityDetails from "./pages/OpportunityDetails";
import AddOpportunity from "./pages/AddOpportunity";

function App() {
  const [opportunities, setOpportunities] = useState<VolunteerOpportunity[]>([]);
  const [search, setSearch] = useState("");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch("http://localhost:3000/opportunities")
      .then((res) => res.json())
      .then((data) => setOpportunities(data))
      .catch(err => {
        console.error("Failed to fetch opportunities:", err);
        setError("Could not load data. Please try refreshing the page.");
      });
  }, []); 

 
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
        throw new Error('Failed to delete');
      }
    })
    .catch(err => {
      console.error(err);
      setError("Failed to delete opportunity.");
    });
  };

  return (
    <div>
      {error && <p style={{ color: 'red' }}>{error}</p>}
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