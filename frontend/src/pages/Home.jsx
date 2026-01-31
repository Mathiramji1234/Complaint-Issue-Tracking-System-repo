import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="home">
      <div className="home-header">
        <h1>Complaint & Issue Tracking System</h1>
        <p>Manage complaints and issues efficiently</p>
      </div>
      
      <div className="home-content">
        <div className="features">
          <div className="feature-card">
            <h3>Submit Complaints</h3>
            <p>Easily submit and track your complaints</p>
          </div>
          <div className="feature-card">
            <h3>Track Status</h3>
            <p>Monitor the progress of your complaints</p>
          </div>
          <div className="feature-card">
            <h3>Admin Management</h3>
            <p>Administrators can manage all complaints</p>
          </div>
        </div>
        
        <div className="home-actions">
          <Link to="/login" className="btn-primary login-btn">Login</Link>
          <Link to="/register" className="btn-secondary register-btn">Register</Link>
        </div>

      </div>
    </div>
  );
};

export default Home;