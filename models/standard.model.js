const mongoose = require("mongoose");

const standardSchema = new mongoose.Schema({
  standardName: String,
  standardNumber: String,
  standardDescription: String
});

const Standard = mongoose.model("standard", standardSchema);

module.exports = Standard;
