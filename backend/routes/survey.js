const express = require("express");
const router = express.Router();
const xlsx = require("xlsx");
const fs = require("fs");
const path = require("path");
const Survey = require("../models/Survey");
const SurveyQuestion = require("../models/SurveyQuestion");

const EXCEL_FILE_PATH = path.join(process.cwd(), "survey_responses.xlsx");

// @route   POST /api/survey
// @desc    Store survey responses in MongoDB and Excel sheet
// @access  Public
router.post("/", async (req, res) => {
  try {
    const { name, email, responses } = req.body;

    if (!name || !email || !responses) {
      return res.status(400).json({ error: "Name, email and responses are required" });
    }

    // 1. Save to MongoDB
    await Survey.create({ name, email, responses });

    // 2. Prepare data for Excel backup
    const dataRow = {
      Timestamp: new Date().toLocaleString(),
      Name: name,
      Email: email,
    };

    // Flatten responses to columns for the spreadsheet
    responses.forEach((r, index) => {
      dataRow[`Q${index + 1}: ${r.question}`] = r.answer;
    });

    let workbook;
    let worksheet;

    if (fs.existsSync(EXCEL_FILE_PATH)) {
      workbook = xlsx.readFile(EXCEL_FILE_PATH);
      worksheet = workbook.Sheets[workbook.SheetNames[0]];
      const existingData = xlsx.utils.sheet_to_json(worksheet);
      existingData.push(dataRow);
      const newSheet = xlsx.utils.json_to_sheet(existingData);
      workbook.Sheets[workbook.SheetNames[0]] = newSheet;
    } else {
      workbook = workbook = xlsx.utils.book_new();
      worksheet = xlsx.utils.json_to_sheet([dataRow]);
      xlsx.utils.book_append_sheet(workbook, worksheet, "Responses");
    }

    xlsx.writeFile(workbook, EXCEL_FILE_PATH);

    // 3. Create Notification
    try {
      const Notification = require("../models/Notification");
      await Notification.create({
        type: 'Survey',
        title: 'New Survey Submission',
        message: `${name} has submitted the awareness survey.`,
        link: '/admin/dashboard'
      });
    } catch (notifyErr) {
      console.warn("Notification creation failed:", notifyErr.message);
    }

    res.status(201).json({ msg: "Survey responses captured successfully" });
  } catch (err) {
    console.error("Survey submission error:", err.message);
    res.status(500).json({ error: "Server Error" });
  }
});

// @route   GET /api/survey
// @desc    Get all survey responses
// @access  Public (or protected if desired)
router.get("/", async (req, res) => {
  try {
    const responses = await Survey.find().sort({ createdAt: -1 });
    res.json(responses);
  } catch (err) {
    console.error("Survey fetch error:", err.message);
    res.status(500).json({ error: "Server Error" });
  }
});

// @route   DELETE /api/survey/:id
// @desc    Delete a survey response
// @access  Public (or protected if desired)
router.delete("/:id", async (req, res) => {
  try {
    const survey = await Survey.findById(req.params.id);
    if (!survey) {
      return res.status(404).json({ msg: "Survey not found" });
    }
    await survey.deleteOne();
    res.json({ msg: "Survey response removed" });
  } catch (err) {
    console.error("Survey delete error:", err.message);
    res.status(500).send("Server Error");
  }
});

// ---------------- SURVEY QUESTIONS MANAGEMENT ----------------

// @route   GET /api/survey/questions
// @desc    Get all survey questions
// @access  Public
router.get("/questions", async (req, res) => {
  try {
    const questions = await SurveyQuestion.find().sort({ createdAt: 1 });
    res.json(questions);
  } catch (err) {
    console.error("Fetch questions error:", err.message);
    res.status(500).json({ error: "Server Error" });
  }
});

// @route   POST /api/survey/questions
// @desc    Add or update survey questions
// @access  Public (should ideally be protected)
router.post("/questions", async (req, res) => {
  try {
    const { question, options, answer, id } = req.body;

    if (!question || !options || options.length < 2) {
      return res.status(400).json({ error: "Question and at least 2 options are required" });
    }

    if (id) {
      // Update existing
      const updated = await SurveyQuestion.findByIdAndUpdate(id, { question, options, answer }, { new: true });
      return res.json(updated);
    } else {
      // Create new
      const newQuestion = await SurveyQuestion.create({ question, options, answer });
      return res.status(201).json(newQuestion);
    }
  } catch (err) {
    console.error("Save question error:", err.message);
    res.status(500).json({ error: "Server Error" });
  }
});

// @route   DELETE /api/survey/questions/:id
// @desc    Delete a survey question
// @access  Public (should ideally be protected)
router.delete("/questions/:id", async (req, res) => {
  try {
    const question = await SurveyQuestion.findById(req.params.id);
    if (!question) {
      return res.status(404).json({ msg: "Question not found" });
    }
    await question.deleteOne();
    res.json({ msg: "Question removed" });
  } catch (err) {
    console.error("Delete question error:", err.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
