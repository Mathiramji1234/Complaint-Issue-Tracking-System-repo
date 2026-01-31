const express = require('express');
const {
  createComplaint,
  getMyComplaints,
  getAllComplaints,
  updateComplaintStatus
} = require('../controllers/complaintController');
const authMiddleware = require('../middleware/authMiddleware');
const roleMiddleware = require('../middleware/roleMiddleware');

const router = express.Router();

router.post('/', authMiddleware, roleMiddleware(['user']), createComplaint);
router.get('/my', authMiddleware, roleMiddleware(['user']), getMyComplaints);
router.get('/', authMiddleware, roleMiddleware(['admin']), getAllComplaints);
router.put('/:id', authMiddleware, roleMiddleware(['admin']), updateComplaintStatus);

module.exports = router;