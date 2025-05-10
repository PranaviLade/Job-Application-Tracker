import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useRecipes } from '../contexts/RecipeContext';
import RecipeCard from '../components/Recipes/RecipeCard';
import '../styles/pages.css';

function CategoryViewPage() {
  const { categoryName } = useParams();
  const { recipes, loading } = useRecipes();
  const [categoryRecipes, setCategoryRecipes] = useState([]);
  const [isVisible, setIsVisible] = useState(false);
  
  // Get emoji for the category
  const getCategoryEmoji = (name) => {
    const emojis = {
      'Breakfast': '🍳',
      'Lunch': '🥪',
      'Dinner': '🍽️',
      'Dessert': '🍰',
      'Appetizer': '🧀',
      'Soup': '🍲',
      'Salad': '🥗',
      'Main Course': '🥘',
      'Side Dish': '🥔',
      'Vegetarian': '🥦',
      'Vegan': '🌱',
      'Gluten Free': '🌾',
      'Seafood': '🦞',
      'Pasta': '🍝',
      'Baking': '🥖',
      'Drinks': '🍹',
      'Snacks': '🍿',
      'Uncategorized': '📋'
    };
    
    return emojis[name] || '🍽️'; // Default emoji if category not found
  };
  
  // Filter recipes by category
  useEffect(() => {
    if (!loading && recipes.length > 0 && categoryName) {
      const decodedCategoryName = decodeURIComponent(categoryName);
      
      const filtered = recipes.filter(recipe => 
        recipe.category === decodedCategoryName || 
        (decodedCategoryName === 'Uncategorized' && !recipe.category)
      );
      
      setCategoryRecipes(filtered);
      
      // Set fade-in animation with a slight delay for better UX
      setTimeout(() => {
        setIsVisible(true);
      }, 300);
    }
  }, [recipes, loading, categoryName]);
  
  const decodedCategoryName = decodeURIComponent(categoryName || '');
  
  return (
    <div className="page-container">
      <div className="category-view-header">
        <h1 className="category-view-title">
          <span className="category-emoji-large">{getCategoryEmoji(decodedCategoryName)}</span>
          {decodedCategoryName}
        </h1>
        <p className="category-view-count">
          {categoryRecipes.length} {categoryRecipes.length === 1 ? 'recipe' : 'recipes'}
        </p>
        <Link to="/categories" className="back-to-categories">
          Back to Categories
        </Link>
      </div>
      
      {loading ? (
        <div className="loading-spinner">Loading recipes...</div>
      ) : (
        <>
          {categoryRecipes.length === 0 ? (
            <div className="empty-state">
              <h3>No recipes in this category</h3>
              <p>Be the first to add a recipe to {decodedCategoryName}!</p>
              <Link to="/add-recipe" className="btn btn-primary">Add Recipe</Link>
            </div>
          ) : (
            <div className={`recipes-grid ${isVisible ? 'fade-in' : ''}`}>
              {categoryRecipes.map(recipe => (
                <RecipeCard key={recipe.id} recipe={recipe} />
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default CategoryViewPage;