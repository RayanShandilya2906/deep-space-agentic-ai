const mongoose = require("mongoose");

const analysisSchema = new mongoose.Schema({
  objectName: String,
  type: String,
  summary: String,
  recommendations: [String],
  imagePath: String,
  interestingFacts: [String],
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports =
mongoose.model("Analysis", analysisSchema);