const mongoose = require('mongoose');

const supportTicketSchema = new mongoose.Schema({
  fullName: { type: String },
  name: { type: String },
  email: { type: String, required: true },
  phoneNumber: { type: String },
  category: { type: String, required: true },
  priority: { type: String, required: true },
  subject: { type: String },
  ticketSubject: { type: String },
  attachment: { type: String },
  description: { type: String, required: true },
  status: { type: String, enum: ['Open', 'In Progress', 'Resolved', 'Closed'], default: 'Open' }
}, { timestamps: true });

module.exports = mongoose.model('SupportTicket', supportTicketSchema);
