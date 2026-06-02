const mongoose = require('mongoose');

const supportTicketSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  email: { type: String, required: true },
  category: { type: String, required: true },
  priority: { type: String, required: true },
  subject: { type: String, required: true },
  description: { type: String, required: true },
  status: { type: String, enum: ['Open', 'In Progress', 'Resolved', 'Closed'], default: 'Open' }
}, { timestamps: true });

module.exports = mongoose.model('SupportTicket', supportTicketSchema);
