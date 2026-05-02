const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const multer = require("multer");
const { GoogleGenerativeAI } = require("@google/generative-ai");

// Load environment variables
dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Configure Multer for file uploads (in-memory)
const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB limit
});

// Initialize Gemini AI
const API_KEY = process.env.API_KEY;
if (!API_KEY) {
  console.error("❌ ERROR: API_KEY is missing in environment variables!");
} else {
  console.log("✅ API KEY LOADED");
}

const genAI = new GoogleGenerativeAI(API_KEY || "");

// --- UTILS ---
const medicalGuardrails = `
You are MedAssist AI, a highly professional AI health assistant.
CRITICAL MEDICAL GUARDRAILS:
1. You are NOT a doctor. You must NEVER provide a medical diagnosis or prescribe medications.
2. Always maintain a neutral, objective, and safe tone.
3. For any symptom or medical query, you MUST conclude by advising them to consult a healthcare professional.
`;

// --- ROUTES ---

// Root test route
app.get("/", (req, res) => {
  res.json({ message: "MedAssist AI Backend is running 🚀" });
});

// Chat Route
app.post("/chat", async (req, res) => {
  try {
    const { message, history = [] } = req.body;

    if (!message) {
      return res.status(400).json({ error: "Message is required" });
    }

    // Use gemini-1.5-flash (Standard stable version)
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    // Format context for the AI
    const recentHistory = history.slice(-4).map(h => `${h.role}: ${h.text}`).join('\n');

    const prompt = `
      ${medicalGuardrails}
      
      Previous Context:
      ${recentHistory}

      Current User Query: ${message}

      STRICT RESPONSE FORMAT (If health related):
      ## Title
      ## Summary
      ## Key Points
      ## Advice
      ## When to See a Doctor
    `;

    const result = await model.generateContent(prompt);
    const responseText = result.response.text() || "I couldn't generate a response. Please try again.";

    res.json({ reply: responseText });
  } catch (error) {
    console.error("❌ Chat API Error:", error.message);
    res.status(500).json({ 
      error: "AI Service unavailable", 
      details: error.message.includes("403") ? "API Key issue (check if leaked or disabled)" : error.message 
    });
  }
});

// Analyze Route
app.post("/analyze", upload.single("report"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    const { mimetype, buffer } = req.file;
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const inlineData = {
      data: buffer.toString("base64"),
      mimeType: mimetype,
    };

    const prompt = `
      ${medicalGuardrails}
      Please analyze the uploaded medical report.
      1. Explain it in simple language.
      2. Highlight any abnormal values.
      3. Explain complex medical terms.
      
      Structure:
      ## Title
      ## Summary
      ## Key Points
      ## Advice
      ## When to See a Doctor
    `;

    const result = await model.generateContent([prompt, { inlineData }]);
    const responseText = result.response.text() || "Failed to analyze the report.";

    res.json({ result: responseText });
  } catch (error) {
    console.error("❌ Analyze API Error:", error.message);
    res.status(500).json({ error: "Failed to process the report", details: error.message });
  }
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(\`✅ Server is running on port \${PORT}\`);
});