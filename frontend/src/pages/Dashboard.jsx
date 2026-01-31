import { useState, useEffect } from 'react';
import { complaintAPI } from '../services/api';
import Navbar from '../components/Navbar';

const Dashboard = () => {
  const [complaints, setComplaints] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: 'Academic',
    priority: 'Medium'
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchComplaints();
  }, []);

  const fetchComplaints = async () => {
    try {
      const response = await complaintAPI.getMy();
      setComplaints(response.data.complaints);
    } catch (error) {
      console.error('Error fetching complaints:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await complaintAPI.create(formData);
      setFormData({ title: '', description: '', category: 'Academic', priority: 'Medium' });
      setShowForm(false);
      fetchComplaints();
    } catch (error) {
      console.error('Error creating complaint:', error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusBadge = (status) => {
    const statusClass = {
      'Open': 'status-open',
      'In Progress': 'status-progress',
      'Resolved': 'status-resolved'
    };
    return <span className={`status-badge ${statusClass[status]}`}>{status}</span>;
  };

  const getPriorityBadge = (priority) => {
    const priorityClass = {
      'Low': 'priority-low',
      'Medium': 'priority-medium',
      'High': 'priority-high'
    };
    return <span className={`priority-badge ${priorityClass[priority]}`}>{priority}</span>;
  };

  return (
    <div>
      <Navbar />
      <div className="dashboard">
        <div className="dashboard-header">
          <h2>My Complaints</h2>
          <button 
            onClick={() => setShowForm(!showForm)}
            className="btn-primary"
          >
            {showForm ? 'Cancel' : 'New Complaint'}
          </button>
        </div>

        {showForm && (
          <form onSubmit={handleSubmit} className="complaint-form">
            <input
              type="text"
              placeholder="Complaint Title"
              value={formData.title}
              onChange={(e) => setFormData({...formData, title: e.target.value})}
              required
            />
            
            <textarea
              placeholder="Description"
              value={formData.description}
              onChange={(e) => setFormData({...formData, description: e.target.value})}
              required
            />
            
            <select
              value={formData.category}
              onChange={(e) => setFormData({...formData, category: e.target.value})}
            >
              <option value="Academic">Academic</option>
              <option value="Infrastructure">Infrastructure</option>
              <option value="Hostel">Hostel</option>
              <option value="Transport">Transport</option>
              <option value="Food">Food</option>
              <option value="Other">Other</option>
            </select>
            
            <select
              value={formData.priority}
              onChange={(e) => setFormData({...formData, priority: e.target.value})}
            >
              <option value="Low">Low Priority</option>
              <option value="Medium">Medium Priority</option>
              <option value="High">High Priority</option>
            </select>
            
            <button type="submit" disabled={loading}>
              {loading ? 'Submitting...' : 'Submit Complaint'}
            </button>
          </form>
        )}

        <div className="complaints-list">
          {complaints.length === 0 ? (
            <p>No complaints found.</p>
          ) : (
            complaints.map((complaint) => (
              <div key={complaint._id} className="complaint-card">
                <div className="complaint-header">
                  <h4>{complaint.title}</h4>
                  <div className="badges">
                    {getStatusBadge(complaint.status)}
                    {getPriorityBadge(complaint.priority)}
                  </div>
                </div>
                <p>{complaint.description}</p>
                <div className="complaint-meta">
                  <span>Category: {complaint.category}</span>
                  <span>Priority: {complaint.priority}</span>
                  <span>Created: {new Date(complaint.createdAt).toLocaleDateString()}</span>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;