"use client"
import React, { createContext, useState, useEffect } from 'react';
import Cookies from 'js-cookie';

// Utility function to get a cookie by name
function getCookie(name) {
  return Cookies.get(name);
}

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [authToken, setAuthToken] = useState(null);

  useEffect(() => {
    // Check cookies for a saved token
    const savedToken = getCookie('token');
  
    if (savedToken) {
      setAuthToken(savedToken);
    }
  }, []);

  const login = (token) => {
    // Set the token as a cookie using js-cookie
    Cookies.set('token', token, { path: '/', sameSite: 'Lax' });
    setAuthToken(token);
    console.log("authToken after login", authToken);
    console.log("Cookies after login", Cookies.get());
  };

  const logout = () => {
    // Remove the token cookie using js-cookie
    Cookies.remove('token', { path: '/' });
    setAuthToken(null);
  };

  return (
    <AuthContext.Provider value={{ authToken, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthProvider, AuthContext };
