import { createContext, useState, useContext, useEffect } from 'react';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    try {
      // Check for user data in localStorage
      const userData = localStorage.getItem('user');
      if (userData) {
        setCurrentUser(JSON.parse(userData));
      }
    } catch (error) {
      console.error('Error retrieving user data:', error);
      setError('Failed to retrieve user data');
    } finally {
      setLoading(false);
    }
    // No cleanup needed for this effect
  }, []);

  const login = async ({ email, password, rememberMe }) => {
    try {
      // Input validation
      if (!email || !password) {
        setError('Email and password are required');
        return false;
      }

      // Frontend-only validation
      if (email === 'user@example.com' && password === 'password') {
        const user = {
          id: '1',
          name: 'Test User',
          email: 'user@example.com'
        };
        
        if (rememberMe) {
          try {
            localStorage.setItem('user', JSON.stringify(user));
          } catch (error) {
            console.error('LocalStorage error during login:', error);
            // Continue even if localStorage fails
          }
        }
        
        // Set user in state
        setCurrentUser(user);
        setError(null);
        return true;
      } else {
        // Demo login - also accept any email with password "password"
        if (password === 'password' && email.includes('@')) {
          const user = {
            id: '1',
            name: email.split('@')[0],
            email: email
          };
          
          if (rememberMe) {
            try {
              localStorage.setItem('user', JSON.stringify(user));
            } catch (error) {
              console.error('LocalStorage error during login:', error);
              // Continue even if localStorage fails
            }
          }
          
          setCurrentUser(user);
          setError(null);
          return true;
        }
        
        setError('Invalid email or password');
        return false;
      }
    } catch (error) {
      console.error('Login process failed:', error);
      setError('Login failed');
      return false;
    }
  };

  const signup = async ({ name, email, password }) => {
    try {
      // Input validation
      if (!name || !email || !password) {
        setError('All fields are required');
        return false;
      }
      
      // Basic email validation
      if (!email.includes('@') || !email.includes('.')) {
        setError('Please enter a valid email address');
        return false;
      }
      
      const user = {
        id: Date.now().toString(),
        name,
        email
      };
      
      // Store user in localStorage
      try {
        localStorage.setItem('user', JSON.stringify(user));
      } catch (error) {
        console.error('LocalStorage error during signup:', error);
        // Continue even if localStorage fails
      }
      
      // Set user in state
      setCurrentUser(user);
      setError(null);
      return true;
    } catch (error) {
      console.error('Signup process failed:', error);
      setError('Signup failed');
      return false;
    }
  };

  const logout = () => {
    try {
      localStorage.removeItem('user');
    } catch (error) {
      console.error('Error during logout:', error);
      // Continue the logout process even if localStorage fails
    }
    setCurrentUser(null);
  };

  const value = {
    currentUser,
    login,
    signup,
    logout,
    loading,
    error
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};