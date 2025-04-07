const mongoose = require('mongoose');

const BillingSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  status: {
    type: String,
    enum: ['pending', 'paid', 'failed'],
    default: 'pending',
  },
  dueDate: {
    type: Date,
    required: true,
  },
  // Additional billing-related fields
}, { timestamps: true });

module.exports = mongoose.model('Billing', BillingSchema);
