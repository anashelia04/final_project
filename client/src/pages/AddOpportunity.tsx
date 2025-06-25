// client/src/pages/AddOpportunity.tsx - NEW FILE

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function AddOpportunity() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    date: '',
    location: '',
    category: '',
  });
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault(); // Prevent default browser submission
    setError(null);

    fetch('http://localhost:3000/opportunities', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })
      .then(res => {
        if (!res.ok) {
          // If server responds with an error, capture it
          return res.json().then(err => Promise.reject(err));
        }
        return res.json();
      })
      .then(() => {
        // On success, navigate back to the homepage
        navigate('/');
      })
      .catch(err => {
        console.error('Failed to create opportunity:', err);
        setError(err.error || 'Failed to submit. Please check your inputs.');
      });
  };

  return (
    <div>
      <h1>Add New Volunteer Opportunity</h1>
      <form onSubmit={handleSubmit}>
        {/* Render error message if one exists */}
        {error && <p style={{ color: 'red' }}>{error}</p>}
        
        <div>
          <label htmlFor="title">Title</label>
          <input type="text" id="title" name="title" value={formData.title} onChange={handleChange} required />
        </div>
        <div>
          <label htmlFor="description">Description</label>
          <textarea id="description" name="description" value={formData.description} onChange={handleChange} required />
        </div>
        <div>
          <label htmlFor="date">Date</label>
          <input type="date" id="date" name="date" value={formData.date} onChange={handleChange} required />
        </div>
        <div>
          <label htmlFor="location">Location</label>
          <input type="text" id="location" name="location" value={formData.location} onChange={handleChange} required />
        </div>
        <div>
          <label htmlFor="category">Category</label>
          <input type="text" id="category" name="category" value={formData.category} onChange={handleChange} />
        </div>
        <button type="submit">Submit Opportunity</button>
      </form>
    </div>
  );
}

export default AddOpportunity;