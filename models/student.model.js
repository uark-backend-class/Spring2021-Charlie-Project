const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  studentId: String
});

const Student = mongoose.model('student', studentSchema);

module.exports = Student;