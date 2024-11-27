import { useState, useEffect } from 'react';

const useAuthCheck = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    token ? setIsAuthenticated(true) : setIsAuthenticated(false)
  }, []);

  return isAuthenticated;
};

export default useAuthCheck;