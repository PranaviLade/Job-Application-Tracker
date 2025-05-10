import { Link } from 'react-router-dom';
import '../../styles/layout.css';

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-content">
          <div className="footer-section">
            <h3 className="footer-title">Recipe Book</h3>
            <p className="footer-description">
              Your personal cookbook in the cloud. Save favorites, create your own, and explore recipes from around the world.
            </p>
          </div>
          
          <div className="footer-section">
            <h3 className="footer-title">Quick Links</h3>
            <ul className="footer-links">
              <li><Link to="/">Home</Link></li>
              <li><Link to="/recipes">All Recipes</Link></li>
              <li><Link to="/categories">Categories</Link></li>
              <li><Link to="/favorites">Favorites</Link></li>
              <li><Link to="/my-recipes">My Recipes</Link></li>
            </ul>
          </div>
          
          <div className="footer-section">
            <h3 className="footer-title">Connect</h3>
            <div className="social-links">
              <a href="#" className="social-link" aria-label="Facebook">
                <span className="social-icon">📘</span>
              </a>
              <a href="#" className="social-link" aria-label="Instagram">
                <span className="social-icon">📷</span>
              </a>
              <a href="#" className="social-link" aria-label="Twitter">
                <span className="social-icon">🐦</span>
              </a>
              <a href="#" className="social-link" aria-label="Pinterest">
                <span className="social-icon">📌</span>
              </a>
            </div>
          </div>
        </div>
        
        <div className="footer-bottom">
          <p className="copyright">
            © {new Date().getFullYear()} Recipe Book App. All rights reserved.
          </p>
          <div className="footer-bottom-links">
            <a href="#">Privacy Policy</a>
            <a href="#">Terms of Service</a>
            <a href="#">Contact Us</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;