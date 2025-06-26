import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

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

    // This is the fetch request to the backend
    fetch('http://localhost:3000/opportunities', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })
      .then(res => {
        if (!res.ok) {
          // If the server responds with an error, capture it to display
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
        // Set the error message to be displayed to the user
        setError(err.error || 'Failed to submit. Please check your inputs.');
      });
  };

  return (
    <div>
      <h1>Add New Volunteer Opportunity</h1>
      <hr />
      <form onSubmit={handleSubmit}>
        {/* Render error message with proper styling if one exists */}
        {error && <p className="error-message">{error}</p>}
        
        {/* Each form field is wrapped in a div with 'form-group' for spacing */}
        <div className="form-group">
          <label htmlFor="title">Title</label>
          <input type="text" id="title" name="title" value={formData.title} onChange={handleChange} required />
        </div>
        
        <div className="form-group">
          <label htmlFor="description">Description</label>
          <textarea id="description" name="description" value={formData.description} onChange={handleChange} required />
        </div>
        
        <div className="form-group">
          <label htmlFor="date">Date</label>
          <input type="date" id="date" name="date" value={formData.date} onChange={handleChange} required />
        </div>
        
        <div className="form-group">
          <label htmlFor="location">Location</label>
          <input type="text" id="location" name="location" value={formData.location} onChange={handleChange} required />
        </div>
        
        <div className="form-group">
          <label htmlFor="category">Category</label>
          <input type="text" id="category" name="category" value={formData.category} onChange={handleChange} placeholder="e.g., Environment, Education" />
        </div>
        
        {/* The submit button uses 'btn' and 'btn-primary' classes for styling */}
        <button type="submit" className="btn btn-primary">Submit Opportunity</button>
      </form>
      
      <br />
      <Link to="/">← Cancel and go back</Link>
    </div>
  );
}

export default AddOpportunity;