import { useState, useEffect } from 'react';
import { complaintAPI } from '../services/api';
import Navbar from '../components/Navbar';

const AdminDashboard = () => {
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(false);
  const [filters, setFilters] = useState({
    status: '',
    category: '',
    sortBy: 'createdAt'
  });

  useEffect(() => {
    fetchComplaints();
  }, [filters]);

  const fetchComplaints = async () => {
    setLoading(true);
    try {
      const response = await complaintAPI.getAll(filters);
      setComplaints(response.data.complaints);
    } catch (error) {
      console.error('Error fetching complaints:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusUpdate = async (id, status) => {
    try {
      await complaintAPI.updateStatus(id, { status });
      fetchComplaints();
    } catch (error) {
      console.error('Error updating status:', error);
    }
  };

  const handlePriorityUpdate = async (id, priority) => {
    try {
      await complaintAPI.updateStatus(id, { priority });
      fetchComplaints();
    } catch (error) {
      console.error('Error updating priority:', error);
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

  const getStats = () => {
    const total = complaints.length;
    const open = complaints.filter(c => c.status === 'Open').length;
    const inProgress = complaints.filter(c => c.status === 'In Progress').length;
    const resolved = complaints.filter(c => c.status === 'Resolved').length;
    return { total, open, inProgress, resolved };
  };

  const stats = getStats();

  return (
    <div>
      <Navbar />
      <div className="dashboard">
        <h2>Admin Dashboard</h2>
        
        {/* Stats */}
        <div className="stats-grid">
          <div className="stat-card">
            <h3>{stats.total}</h3>
            <p>Total Complaints</p>
          </div>
          <div className="stat-card">
            <h3>{stats.open}</h3>
            <p>Open</p>
          </div>
          <div className="stat-card">
            <h3>{stats.inProgress}</h3>
            <p>In Progress</p>
          </div>
          <div className="stat-card">
            <h3>{stats.resolved}</h3>
            <p>Resolved</p>
          </div>
        </div>

        {/* Filters */}
        <div className="filters">
          <select
            value={filters.status}
            onChange={(e) => setFilters({...filters, status: e.target.value})}
          >
            <option value="">All Status</option>
            <option value="Open">Open</option>
            <option value="In Progress">In Progress</option>
            <option value="Resolved">Resolved</option>
          </select>
          
          <select
            value={filters.category}
            onChange={(e) => setFilters({...filters, category: e.target.value})}
          >
            <option value="">All Categories</option>
            <option value="Academic">Academic</option>
            <option value="Infrastructure">Infrastructure</option>
            <option value="Hostel">Hostel</option>
            <option value="Transport">Transport</option>
            <option value="Food">Food</option>
            <option value="Other">Other</option>
          </select>
          
          <select
            value={filters.sortBy}
            onChange={(e) => setFilters({...filters, sortBy: e.target.value})}
          >
            <option value="createdAt">Sort by Date</option>
            <option value="priority">Sort by Priority</option>
          </select>
        </div>

        {/* Complaints List */}
        <div className="complaints-list">
          <h3>All Complaints ({complaints.length})</h3>
          {loading ? (
            <p>Loading...</p>
          ) : complaints.length === 0 ? (
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
                  <span>Created by: {complaint.createdBy?.name}</span>
                  <span>Created: {new Date(complaint.createdAt).toLocaleDateString()}</span>
                </div>
                
                <div className="admin-actions">
                  <div className="action-group">
                    <label>Status:</label>
                    <select
                      value={complaint.status}
                      onChange={(e) => handleStatusUpdate(complaint._id, e.target.value)}
                    >
                      <option value="Open">Open</option>
                      <option value="In Progress">In Progress</option>
                      <option value="Resolved">Resolved</option>
                    </select>
                  </div>
                  
                  <div className="action-group">
                    <label>Priority:</label>
                    <select
                      value={complaint.priority}
                      onChange={(e) => handlePriorityUpdate(complaint._id, e.target.value)}
                    >
                      <option value="Low">Low</option>
                      <option value="Medium">Medium</option>
                      <option value="High">High</option>
                    </select>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;