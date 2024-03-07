const mongoose = require("mongoose");

const companySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  phone: Number,
  email: {
    type: String,
    required: true,
    unique: true,
  },
  companyName: {
    type: String,
    required: true,
  },
  city: String,
  state: String,
  diversityInclusionCommittee: Boolean,
  jobs: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Job",
    },
  ],
});

companySchema.pre("remove", async function (next) {
  await this.model("Job").deleteMany({ companyId: this._id });
  next();
});

const Company = mongoose.model("Company", companySchema);

module.exports = Company;
