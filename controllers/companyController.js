const Company = require('../models/Company');

// @desc        Get all companies
// @route       GET /companies
// @access      Public
exports.getAllCompany = async (req, res) => {
  try {
    const allCompany = await Company.find();
    res
      .status(200)
      .json({ success: true, count: allCompany.length, data: allCompany });
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
    const company = await Company.findByIdAndDelete(req.params.id);

    if (!company) {
      return res.status(400).json({ success: false });
    }

    res.status(200).json({ success: true, data: company });
  } catch (err) {
    res.status(400).json({ success: false });
  }
};
