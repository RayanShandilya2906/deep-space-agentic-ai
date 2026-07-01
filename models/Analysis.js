const mongoose = require("mongoose");

const analysisSchema = new mongoose.Schema({
  objectName: String,
  type: String,
  summary: String,
  objectImage: String,
  recommendations: [
    {
      name: String,
      image: String,
      fact: String
    }
  ],
  interestingFacts: [String],
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports =
mongoose.model("Analysis", analysisSchema);
