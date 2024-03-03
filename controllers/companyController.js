const Company = require('../models/Company');

// @desc        Get all companies
// @route       GET /companies
// @access      Public
exports.getAllCompany = async (req, res) => {
  let query;

  const reqQuery = { ...req.query };

  const removeFields = ['select', 'sort', 'page', 'limit'];

  removeFields.forEach((param) => delete reqQuery[param]);
  console.log(reqQuery);

  let querStr = JSON.stringify(reqQuery);
  querStr = querStr.replace(/\b(gt|gte|lt|lte|in)\b/g, (match) => `$${match}`);

  query = Company.find(JSON.parse(querStr)).populate('sessions');

  if (req.query.select) {
    const fields = req.query.select.split(',').join(' ');
    query = query.select(fields);
  }

  //Sort
  if (req.query.sort) {
    const sortBy = req.query.sort.split(',').join(' ');
    query = query.sort(sortBy);
  } else {
    query = query.sort('name');
  }

  //Pagination
  const page = parseInt(req.query.page, 10) || 1;
  const limit = parseInt(req.query.limit, 10) || 25;
  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;

  try {
    const total = await Company.countDocuments();
    query = query.skip(startIndex).limit(limit);

    const allCompany = await query;
    const pagination = {};
    if (endIndex < total) {
      pagination.next = { page: page + 1, limit };
    }
    if (startIndex > 0) {
      pagination.prev = { page: page - 1, limit };
    }
    res
      .status(200)
      .json({
        success: true,
        count: allCompany.length,
        pagination,
        data: allCompany,
      });
  } catch (err) {
    res.status(400).json({ success: false });
  }
};

// @desc        Get single company
// @route       GET /companies/:id
// @access      Public
exports.getCompany = async (req, res) => {
  try {
    const company = await Company.findById(req.params.id);

    if (!company) {
      return res.status(400).json({ success: false });
    }
    res.status(200).json({ success: true, data: company });
  } catch (err) {
    res.status(400).json({ success: false });
  }
};

// @desc        Create new company
// @route       POST /companies
// @access      Private
exports.createCompany = async (req, res) => {
  const company = await Company.create(req.body);
  res.status(201).json({
    success: true,
    data: company,
  });
};

exports.updateCompany = async (req, res) => {
  try {
    const company = await Company.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!company) {
      return res.status(400).json({ success: false });
    }

    res.status(200).json({ success: true, data: company });
  } catch (err) {
    res.status(400).json({ success: false });
  }
};

// @desc        Delete company
// @route       DELETE /companies/:id
// @access      Private
exports.deleteCompany = async (req, res) => {
  try {
    const company = await Company.findById(req.params.id);

    if (!company) {
      return res
        .status(404)
        .json({
          success: false,
          msg: `Company not found with id of ${req.params.id}`,
        });
    }

    await company.deleteOne();
    res.status(200).json({ success: true, data: company });
  } catch (err) {
    res.status(400).json({ success: false });
  }
};
