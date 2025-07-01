const mongoose = require('mongoose');

const employeeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    match: [/^[A-Za-z\s]+$/, 'Only alphabets and spaces allowed'],
  },
  age: {
    type: Number,
    min: [1, 'Age must be a positive number'],
    max: [150, 'Age must be a reasonable number']
  },
  email: {
    type: String,
    required: true,
    unique: true,
    match: [/\S+@\S+\.\S+/, 'Email is invalid'],
  },
  dob: String,
  address: String,
  photo: String,
}, { timestamps: true });

module.exports = mongoose.model('Employee', employeeSchema, 'employees');
