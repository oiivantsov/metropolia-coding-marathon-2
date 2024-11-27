import { NavLink, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import logo from '../assets/images/logo.png';

const Navbar = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if token exists in localStorage
    const token = localStorage.getItem('token');
    setIsAuthenticated(!!token);
  }, []);

  const logout = () => {
    // Clear the token from localStorage
    localStorage.removeItem('token');
    setIsAuthenticated(false);
    navigate('/'); // Redirect to the home page
  };

  const linkClass = ({ isActive }) =>
    isActive
      ? 'bg-black text-white hover:bg-gray-900 hover:text-white rounded-md px-3 py-2'
      : 'text-white hover:bg-gray-900 hover:text-white rounded-md px-3 py-2';

  return (
    <nav className="bg-indigo-700 border-b border-indigo-500">
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <div className="flex h-20 items-center justify-between">
          <div className="flex flex-1 items-center justify-center md:items-stretch md:justify-start">
            <NavLink className="flex flex-shrink-0 items-center mr-4" to="/">
              <img className="h-10 w-auto" src={logo} alt="React Jobs" />
              <span className="hidden md:block text-white text-2xl font-bold ml-2">
                React Jobs
              </span>
            </NavLink>
            <div className="md:ml-auto">
              <div className="flex space-x-2">
                <NavLink to="/" className={linkClass}>
                  Home
                </NavLink>
                <NavLink to="/jobs" className={linkClass}>
                  Jobs
                </NavLink>
                {isAuthenticated && (
                  <NavLink to="/add-job" className={linkClass}>
                    Add Job
                  </NavLink>
                )}
                {!isAuthenticated && (
                  <>
                    <NavLink to="/signup" className={linkClass}>
                      Signup
                    </NavLink>
                    <NavLink to="/login" className={linkClass}>
                      Login
                    </NavLink>
                  </>
                )}
                {isAuthenticated && (
                  <button
                    onClick={logout}
                    className="text-white bg-red-500 hover:bg-red-700 rounded-md px-3 py-2"
                  >
                    Logout
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
