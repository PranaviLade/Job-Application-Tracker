import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useRecipes } from '../contexts/RecipeContext';
import '../styles/pages.css';

function CategoriesPage() {
  const { recipes, loading } = useRecipes();
  const [categories, setCategories] = useState([]);
  const [isVisible, setIsVisible] = useState(false);
  
  // Get the list of unique categories and count recipes in each
  useEffect(() => {
    if (!loading && recipes.length > 0) {
      const categoryMap = {};
      
      recipes.forEach(recipe => {
        const category = recipe.category || 'Uncategorized';
        
        if (!categoryMap[category]) {
          categoryMap[category] = {
            name: category,
            count: 1,
            recipeIds: [recipe.id]
          };
        } else {
          categoryMap[category].count += 1;
          categoryMap[category].recipeIds.push(recipe.id);
        }
      });
      
      // Convert map to array and sort by count
      const categoryArray = Object.values(categoryMap).sort((a, b) => b.count - a.count);
      setCategories(categoryArray);
      
      // Set fade-in animation
      setTimeout(() => {
        setIsVisible(true);
      }, 300);
    }
  }, [recipes, loading]);
  
  // Generate a background color based on category name
  const getCategoryColor = (name) => {
    const colors = [
      'linear-gradient(135deg, #ff9a9e 0%, #fad0c4 100%)',
      'linear-gradient(135deg, #a1c4fd 0%, #c2e9fb 100%)',
      'linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)',
      'linear-gradient(135deg, #84fab0 0%, #8fd3f4 100%)',
      'linear-gradient(135deg, #fccb90 0%, #d57eeb 100%)',
      'linear-gradient(135deg, #e0c3fc 0%, #8ec5fc 100%)',
      'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
      'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
    ];
    
    // Use the string's character codes to select a consistent color
    const charSum = name.split('').reduce((sum, char) => sum + char.charCodeAt(0), 0);
    const colorIndex = charSum % colors.length;
    
    return colors[colorIndex];
  };
  
  // Generate an emoji for each category
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
  
  // Debug function to check category links
  const logCategoryLink = (categoryName) => {
    console.log(`Category link clicked: ${categoryName}`);
  };
  
  return (
    <div className="page-container">
      <div className="categories-header">
        <h1 className="page-title">Browse by Category</h1>
        <p className="page-description">
          Discover recipes organized by category. Click on any category to view all recipes in that category.
        </p>
      </div>
      
      {loading ? (
        <div className="loading-spinner">Loading categories...</div>
      ) : (
        <>
          {categories.length === 0 ? (
            <div className="empty-state">
              <h3>No categories available</h3>
              <p>Add recipes with categories to see them here!</p>
              <Link to="/add-recipe" className="btn btn-primary">Add Recipe</Link>
            </div>
          ) : (
            <div className={`categories-grid ${isVisible ? 'fade-in' : ''}`}>
              {categories.map((category) => (
                <Link 
                  to={`/category/${encodeURIComponent(category.name)}`} 
                  key={category.name}
                  className="category-card"
                  style={{ background: getCategoryColor(category.name) }}
                  onClick={() => logCategoryLink(category.name)}
                >
                  <div className="category-emoji">{getCategoryEmoji(category.name)}</div>
                  <div className="category-info">
                    <h3 className="category-name">{category.name}</h3>
                    <span className="category-count">{category.count} {category.count === 1 ? 'recipe' : 'recipes'}</span>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default CategoriesPage;