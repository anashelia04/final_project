import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Header.css';
 
function Header() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/');
    } catch (error) {
      console.error("Failed to log out", error);
    }
  };

  return (
    <header className="app-header">
      <div className="container header-container">
        <Link to="/" className="logo">
          VolunteerHub
        </Link>
        <nav>
          {/* This link is always visible */}
          <NavLink 
            to="/" 
            className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}
          >
            Home
          </NavLink>
          
          {user ? (
            <>
              {/* The new "My Dashboard" link */}
              <NavLink 
                to="/dashboard" 
                className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}
              >
                My Dashboard
              </NavLink>

              <NavLink to="/add-opportunity" className="btn btn-primary">
                + Add Opportunity
              </NavLink>
              
              <button onClick={handleLogout} className="btn">Logout</button>
            </>
          ) : (
            // --- Logged-out User View ---
            <NavLink to="/login" className="btn btn-primary">
              Login
            </NavLink>
          )}
        </nav>
      </div>
    </header>
  );
}

export default Header;