// Update Navbar.jsx to include categories link
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import '../../styles/layout.css';

function Navbar() {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();
  
  const handleLogout = () => {
    logout();
    navigate('/login');
  };
  
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          Recipe Book
        </Link>
    
        
        {currentUser ? (
          <div className="navbar-menu">
            <Link to="/" className="navbar-item">Home</Link>
            <Link to="/categories" className="navbar-item">Categories</Link>  {/* New Link */}
            <Link to="/favorites" className="navbar-item">Favorites</Link>
            <Link to="/my-recipes" className="navbar-item">My Recipes</Link>
            <button onClick={handleLogout} className="navbar-btn">Logout</button>
          </div>
        ) : (
          <div className="navbar-menu">
            <Link to="/login" className="navbar-item">Login</Link>
            <Link to="/signup" className="navbar-item">Sign Up</Link>
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navbar;