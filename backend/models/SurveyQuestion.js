const mongoose = require("mongoose");

const surveyQuestionSchema = new mongoose.Schema(
  {
    question: { type: String, required: true, trim: true },
    options: [{ type: String, required: true, trim: true }],
    answer: { type: String, trim: true }, // Optional correct answer
  },
  { timestamps: true }
);

module.exports = mongoose.model("SurveyQuestion", surveyQuestionSchema);
