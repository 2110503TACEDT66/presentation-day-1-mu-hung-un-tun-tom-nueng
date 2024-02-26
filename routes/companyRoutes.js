const express = require('express');
const {
  getCompanies,
  getCompany,
  createCompany,
  updateCompany,
  deleteCompany,
} = require('../controllers/companyController');

const router = express.Router();

// const {protect,authorize} = require('../middleware/auth');

router.route('/').get(getCompanies).post(createCompany);
router.route('/:id').get(getCompany).put(updateCompany).delete(deleteCompany);

module.exports = router;
