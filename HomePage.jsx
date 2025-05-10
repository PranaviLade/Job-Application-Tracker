import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useRecipes } from '../contexts/RecipeContext';
import RecipeCard from '../components/Recipes/RecipeCard';
import '../styles/pages.css';

function HomePage() {
  const { recipes, loading } = useRecipes();
  const [isVisible, setIsVisible] = useState(false);
  
  // Control the fade-in effect for recipe cards
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 500);
    
    return () => clearTimeout(timer);
  }, []);
  
  // Safely handle recipes data
  const safeRecipes = Array.isArray(recipes) ? recipes : [];
  
  return (
    <div className="homepage">
      {/* Hero Section */}
      <div className="hero-section">
        <div className="hero-content">
          <h1>Discover & Share Amazing Recipes</h1>
          <p>Your personal cookbook in the cloud. Save favorites, create your own, and explore recipes from around the world.</p>
          <div className="hero-buttons">
            <Link to="/my-recipes" className="btn btn-primary">Browse Recipes</Link>
            <Link to="/add-recipe" className="btn btn-secondary">Share Your Recipe</Link>
          </div>
        </div>
      </div>
      
      {/* Features Section */}
      <div className="features-section">
        <h2 className="section-title">Why Recipe Book?</h2>
        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon">📝</div>
            <h3>Create & Organize</h3>
            <p>Add your own recipes and organize them by categories</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">⭐</div>
            <h3>Save Favorites</h3>
            <p>Mark recipes you love and access them anytime</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">🔍</div>
            <h3>Discover New Ideas</h3>
            <p>Find inspiration with our collection of recipes</p>
          </div>
        </div>
      </div>
      
      {/* Featured Recipes Section */}
      <div className="featured-recipes-section">
        <div className="section-header">
          <h2 className="section-title">Featured Recipes</h2>
          <Link to="/my-recipes" className="view-all-link">View All Recipes</Link>
        </div>
        
        {loading ? (
          <div className="loading-spinner">Loading recipes...</div>
        ) : (
          <>
            {safeRecipes.length === 0 ? (
              <div className="empty-state">
                <h3>No recipes available yet</h3>
                <p>Be the first to add a delicious recipe!</p>
                <Link to="/add-recipe" className="btn btn-primary">Add Recipe</Link>
              </div>
            ) : (
              <div className={`recipes-grid ${isVisible ? 'fade-in' : ''}`}>
                {/* Only show up to 6 recipes on the homepage */}
                {safeRecipes.slice(0, 6).map((recipe, index) => (
                  <RecipeCard 
                    key={recipe.id || `recipe-${index}`} 
                    recipe={recipe} 
                  />
                ))}
              </div>
            )}
          </>
        )}
      </div>
      
      {/* About Section */}
      <div className="about-section">
        <div className="about-content">
          <h2>About Recipe Book</h2>
          <p>Recipe Book is more than just a collection of recipes - it's a community of food enthusiasts sharing their culinary creativity. Our mission is to make cooking more accessible, enjoyable, and social.</p>
          <p>Whether you're a seasoned chef or just starting out in the kitchen, Recipe Book provides the tools to document, organize, and discover amazing recipes.</p>
        </div>
        <div className="about-image">
          {/* This will be a placeholder image that you can replace */}
          <div className="placeholder-image"></div>
        </div>
      </div>
    </div>
  );
}

export default HomePage;