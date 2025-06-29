import { useState, useEffect } from "react";
import { Routes, Route } from 'react-router-dom';
import axios from "axios";
import { VolunteerOpportunity } from '@shared/types/VolunteerOpportunity';
import DashboardPage from './pages/DashboardPage';
import './App.css';

// Components and Pages
import Header from "./components/Header";
import HomePage from "./pages/HomePage";
import OpportunityDetails from "./pages/OpportunityDetails";
import AddOpportunity from "./pages/AddOpportunity";
import LoginPage from "./pages/LoginPage";
import ProtectedRoute from "./components/ProtectedRoute";
import { useAuth } from "./context/AuthContext";

function App() {
  const [opportunities, setOpportunities] = useState<VolunteerOpportunity[]>([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuth();

  useEffect(() => {
    setLoading(true);
    setError(null);

    const params = new URLSearchParams();
    if (search) params.append('search', search);
    if (category) params.append('category', category);
    
    const url = `/api/opportunities?${params.toString()}`;

    axios.get(url)
      .then(res => setOpportunities(res.data))
      .catch(err => setError(err.message || "Failed to fetch data."))
      .finally(() => setLoading(false));
      
  }, [search, category]);

  const handleDelete = async (id: number) => {
    if (!window.confirm("Are you sure you want to delete this opportunity?")) return;

    try {
      await axios.delete(`/api/opportunities/${id}`);
      setOpportunities(prev => prev.filter(opp => opp.id !== id));
    } catch (err: any) {
      setError(err.response?.data?.error || "Failed to delete opportunity.");
    }
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
          <Route path="/login" element={<LoginPage />} />
          <Route path="/opportunities/:id" element={<OpportunityDetails />} />
          <Route 
                path="/dashboard"
                element={
               <ProtectedRoute>
            <DashboardPage />
        </ProtectedRoute>
    }
/>
          <Route 
            path="/add-opportunity" 
            element={
              <ProtectedRoute>
                <AddOpportunity />
              </ProtectedRoute>
            } 
          />
        </Routes>
      </main>
    </>
  );
}

export default App;