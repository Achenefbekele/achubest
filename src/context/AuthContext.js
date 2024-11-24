"use client"
import React, { createContext, useState, useEffect } from 'react';

// Utility function to get a cookie by name
function getCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(';').shift();
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
    // Set the token as a cookie
    document.cookie = `token=${token}; path=/; secure; samesite=strict`;
    setAuthToken(token);
    console.log("authToken", authToken);
  };

  const logout = () => {
    // Remove the token cookie by setting its expiration date to the past
    document.cookie = 'token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT';
    setAuthToken(null);
  };

  return (
    <AuthContext.Provider value={{ authToken, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthProvider, AuthContext };
