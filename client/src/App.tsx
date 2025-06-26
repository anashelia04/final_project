import { useState, useEffect } from "react";
import { Routes, Route } from 'react-router-dom';
import { VolunteerOpportunity } from '@shared/types/VolunteerOpportunity';
import './App.css';

import Header from "./components/Header";
import HomePage from "./pages/HomePage";
import OpportunityDetails from "./pages/OpportunityDetails";
import AddOpportunity from "./pages/AddOpportunity";

function App() {
  const [opportunities, setOpportunities] = useState<VolunteerOpportunity[]>([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    setError(null);

    const params = new URLSearchParams();
    if (search) params.append('search', search);
    if (category) params.append('category', category);
    
    const queryString = params.toString();
    const url = `http://localhost:3000/opportunities?${queryString}`;

    fetch(url)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch data from the server.");
        return res.json();
      })
      .then((data) => setOpportunities(data))
      .catch(err => setError(err.message))
      .finally(() => setLoading(false));
      
  }, [search, category]);

  const handleDelete = (id: number) => {
    if (!window.confirm("Are you sure you want to delete this opportunity?")) return;

    fetch(`http://localhost:3000/opportunities/${id}`, { method: 'DELETE' })
    .then(res => {
      if (res.ok) {
        setOpportunities(prev => prev.filter(opp => opp.id !== id));
      } else {
  
        res.json().then(err => {
            setError(err.error || "Failed to delete opportunity.");
        }).catch(() => {
            setError("Failed to delete opportunity.");
        });
      }
    })
    .catch(err => {
      console.error(err);
      setError("An unexpected error occurred while trying to delete.");
    });
  };

  return (
    <>
      <Header />
      <main className="container">
        {error && <p className="error-message" onClick={() => setError(null)}>✖ {error}</p>}
        <Routes>
          <Route 
            path="/" 
            element={
              <HomePage 
                search={search}
                setSearch={setSearch}
                category={category}
                setCategory={setCategory}
                opportunities={opportunities}
                loading={loading} 
                onDelete={handleDelete}
              />
            } 
          />
          <Route path="/opportunities/:id" element={<OpportunityDetails />} />
          <Route path="/add" element={<AddOpportunity />} />
        </Routes>
      </main>
    </>
  );
}

export default App;