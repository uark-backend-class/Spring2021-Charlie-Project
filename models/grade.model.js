const mongoose = require("mongoose");

const gradeSchema = new mongoose.Schema(
  {
    studentId: String,
    standardName: String,
    grade: String,
  },
  { timestamps: true }
);

const Grade = mongoose.model("grade", gradeSchema);

module.exports = Grade;
