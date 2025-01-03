const mongoose = require('mongoose');

// Create a schema for the gym account
const gymAccountSchema = new mongoose.Schema({
  gymName: {
    type: String,
    required: true,
    unique: true, // Ensures the gym name is unique
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true, // Ensures the email is unique
    lowercase: true,
    trim: true,
    match: [/\S+@\S+\.\S+/, 'is invalid'], // Basic email validation
  },
  password: {
    type: String,
    required: true,
    minlength: 6, // Set a minimum length for security
  },
  isApproved: {
    type: Boolean,
    default: false, // By default, gym is not approved
  },
  commercialRegister: {
    type: String,
    required: true, // PDF file path for the gym's commercial register
  },
}, { timestamps: true });


// Create and export the model
const GymAccount = mongoose.model('GymAccount', gymAccountSchema);

module.exports = GymAccount;
