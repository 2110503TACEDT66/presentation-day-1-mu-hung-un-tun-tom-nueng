const express = require('express');
const {
  getSessions,
  getSession,
  addSession,
  updateSession,
  deleteSession,
} = require('../controllers/appointments');

const router = express.Router({ mergeParams: true });

const { protect, authorize } = require('../middleware/authMiddleware');

router
  .route('/')
  .get(protect, getSessions)
  .post(protect, authorize('admin', 'user'), addSession);
router
  .route('/:id')
  .get(protect, getSession)
  .put(protect, authorize('admin', 'user'), updateSession)
  .delete(protect, authorize('admin', 'user'), deleteSession);

module.exports = router;
