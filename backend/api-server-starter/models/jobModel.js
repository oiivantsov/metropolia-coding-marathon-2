const mongoose = require('mongoose');
const validator = require("validator");

const jobSchema = new mongoose.Schema({
  title: { type: String, required: true },
  type: { type: String, required: true },
  location: { type: String, required: true },
  description: { type: String, required: true },
  salary: { type: String, required: true },
  company: {
    name: { type: String, required: true },
    description: { type: String, required: true },
    contactEmail: { type: String, required: true, unique: true },
    contactPhone: { type: String, required: true }
  }
});

jobSchema.statics.new = async function (job) {
  if (
      !job.title
      || !job.type
      || !job.location
      || !job.description
      || !job.salary
      || !job.company
      || !job.company.name
      || !job.company.description
      || !job.company.contactEmail
      || !job.company.contactPhone
  ) {
    return {code: 400, error: "All fields must be filled"};
  }

  if (!validator.isEmail(job.company.contactEmail)) {
    return {code: 400, error: "Invalid email address"};
  }

  try {
    if (await this.findOne({"company.contactEmail": job.company.contactEmail})) {
      return {code: 400, error: "Email already in use"};
    }

    return this.create(job);
  } catch (error) {
    return {code: 500, error: "Internal server error"};
  }

};

// Ensure virtual fields are serialized
jobSchema.set('toJSON', {
  virtuals: true,
  transform: (doc, ret) => {
    ret.id = ret._id;
    delete ret._id;
    delete ret.__v;
    return ret;
  }
});

const Job = mongoose.model('Job', jobSchema);

module.exports = Job;

