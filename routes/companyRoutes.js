const express = require('express');
const {
  getCompanies,
  getCompany,
  createCompany,
  updateCompany,
  deleteCompany,
} = require('../controllers/companyController');

const router = express.Router();

const { protect, authorize } = require('../middleware/authMiddleware');

router
  .route('/')
  .get(protect, getCompanies)
  .post(protect, authorize('admin'), createCompany);
router
  .route('/:id')
  .get(protect, getCompany)
  .put(protect, authorize('admin'), updateCompany)
  .delete(protect, authorize('admin'), deleteCompany);

module.exports = router;
