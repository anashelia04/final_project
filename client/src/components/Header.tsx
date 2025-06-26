import { Link, NavLink } from 'react-router-dom';
import './Header.css';
 
function Header() {
  return (
    <header className="app-header">
      <div className="container header-container">
        <Link to="/" className="logo">
          VolunteerHub
        </Link>
        <nav>
          <NavLink to="/" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>
            Home
          </NavLink>
          <NavLink to="/add" className="btn btn-primary">
            + Add Opportunity
          </NavLink>
        </nav>
      </div>
    </header>
  );
}

export default Header;