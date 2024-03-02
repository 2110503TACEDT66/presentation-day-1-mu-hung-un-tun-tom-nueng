const mongoose = require('mongoose');

const CompanySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, `Please add company's name`],
      unique: true,
      trim: true,
    },
    address: {
      type: String,
      required: [true, `Please add company's address`],
    },
    website: {
      type: String,
      required: [true, `Please add company's website`],
    },
    desc: {
      type: String,
      required: [true, `Please add company's description`],
    },
    tel: {
      type: String,
      required: [true, `Please add company phone number`],
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
);

// Check delete appointments when a hospital is deleted
CompanySchema.pre(
  'deleteOne',
  { document: true, query: false },
  async function (next) {
    console.log(`Session being removed from company ${this._id}`);
    await this.model('Session').deleteMany({ company: this._id });
    next();
  },
);

// Reverse populate with virtuals
CompanySchema.virtual('sessions', {
  ref: 'Session',
  localField: '_id',
  foreignField: 'Company',
  justOne: false,
});

module.exports = mongoose.model('Company', CompanySchema);
