const express = require("express");
const router = express.Router();
const multer = require("multer");
const analyzeController = require("../controllers/analyzeController");

// Configure multer for memory storage
const storage = multer.memoryStorage();
const upload = multer({ 
  storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB limit
  fileFilter: (req, file, cb) => {
    if (file.mimetype === "application/pdf" || file.mimetype.startsWith("image/")) {
      cb(null, true);
    } else {
      cb(new Error("Only PDF and Images are allowed!"));
    }
  }
});

router.post("/", upload.single("report"), analyzeController.handleAnalyze);

module.exports = router;
