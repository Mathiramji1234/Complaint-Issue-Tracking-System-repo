const Complaint = require('../models/Complaint');

const createComplaint = async (req, res) => {
  try {
    const { title, description, category, priority = 'Medium' } = req.body;
    
    const complaint = await Complaint.create({
      title,
      description,
      category,
      priority,
      createdBy: req.user._id
    });

    await complaint.populate('createdBy', 'name email');
    
    res.status(201).json({
      success: true,
      complaint
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getMyComplaints = async (req, res) => {
  try {
    const complaints = await Complaint.find({ createdBy: req.user._id })
      .populate('createdBy', 'name email')
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      complaints
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getAllComplaints = async (req, res) => {
  try {
    const { status, category, from, to, sortBy = 'createdAt' } = req.query;
    
    // Build filter object
    const filter = {};
    if (status) filter.status = status;
    if (category) filter.category = category;
    if (from || to) {
      filter.createdAt = {};
      if (from) filter.createdAt.$gte = new Date(from);
      if (to) filter.createdAt.$lte = new Date(to);
    }

    // Build sort object
    let sortOptions = { createdAt: -1 };
    if (sortBy === 'priority') {
      sortOptions = { priority: -1, createdAt: -1 }; // High -> Low priority
    }

    const complaints = await Complaint.find(filter)
      .populate('createdBy', 'name email')
      .sort(sortOptions);

    res.json({
      success: true,
      complaints
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateComplaintStatus = async (req, res) => {
  try {
    const { status, priority } = req.body;
    const updateData = {};
    if (status) updateData.status = status;
    if (priority) updateData.priority = priority;
    
    const complaint = await Complaint.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true }
    ).populate('createdBy', 'name email');

    if (!complaint) {
      return res.status(404).json({ message: 'Complaint not found' });
    }

    res.json({
      success: true,
      complaint
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createComplaint,
  getMyComplaints,
  getAllComplaints,
  updateComplaintStatus
};