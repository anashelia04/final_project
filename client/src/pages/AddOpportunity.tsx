import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';

function AddOpportunity() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    date: '',
    location: '',
    category: 'General',
    volunteerLimit: 1, // New field with default value
  });
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'volunteerLimit' ? parseInt(value, 10) : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (formData.volunteerLimit < 1) {
      setError('Volunteer limit must be at least 1.');
      return;
    }

    try {
      await axios.post('/api/opportunities', formData);
      navigate('/');
    } catch (err: any) {
      console.error('Failed to create opportunity:', err);
      setError(err.response?.data?.error || 'Failed to submit. Please check your inputs.');
    }
  };

  return (
    <div>
      <h1>Add New Volunteer Opportunity</h1>
      <hr />
      <form onSubmit={handleSubmit}>
        {error && <p className="error-message">{error}</p>}
        
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
          <select id="category" name="category" value={formData.category} onChange={handleChange}>
            <option value="General">General</option>
            <option value="Environment">Environment</option>
            <option value="Education">Education</option>
            <option value="Health">Health</option>
            <option value="Community">Community</option>
          </select>
        </div>
        
        {/* New Field for Volunteer Limit */}
        <div className="form-group">
          <label htmlFor="volunteerLimit">Volunteer Limit</label>
          <input type="number" id="volunteerLimit" name="volunteerLimit" value={formData.volunteerLimit} onChange={handleChange} min="1" required />
        </div>
        
        <button type="submit" className="btn btn-primary">Submit Opportunity</button>
      </form>
      
      <br />
      <Link to="/">← Cancel and go back</Link>
    </div>
  );
}

export default AddOpportunity;