const Company = require('../models/company');

exports.getCompanies = async (req, res) => {
  try {
    const companies = await Company.find();
    res
      .status(200)
      .json({ success: true, count: companies.length, data: companies });
  } catch (err) {
    res.status(400).json({ success: false });
  }
};

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
