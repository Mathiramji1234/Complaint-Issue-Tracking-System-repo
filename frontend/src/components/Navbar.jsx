import { useAuth } from '../utils/AuthContext';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="navbar">
      <div className="nav-brand">
        <h3>Complaint Tracker</h3>
      </div>
      
      {user && (
        <div className="nav-menu">
          <span>Welcome, {user.name}</span>
          <span className="role-badge">{user.role}</span>
          <button onClick={handleLogout} className="logout-btn">
            Logout
          </button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;