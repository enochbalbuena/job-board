const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  budget: Number,
  status: { type: String, default: 'open', enum: ['open', 'in progress', 'closed'] },
  postedAt: { type: Date, default: Date.now },
  deadline: Date,
  clientId: { type: mongoose.Schema.Types.ObjectId, ref: 'Client' },
  location: String,
  skillsRequired: [String]
});

module.exports = mongoose.model('Job', jobSchema);
