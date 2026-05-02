const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const { GoogleGenerativeAI } = require("@google/generative-ai");

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// 🔥 API KEY CHECK
const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  console.log("❌ API KEY MISSING");
} else {
  console.log("✅ API KEY LOADED");
}

// 🔥 Gemini setup
const genAI = new GoogleGenerativeAI(API_KEY);

// TEST route
app.get("/", (req, res) => {
  res.send("Backend is running 🚀");
});

// CHAT route
app.post("/chat", async (req, res) => {
  try {
    const { message } = req.body;

    if (!message) {
      return res.json({ reply: "Please send a message" });
    }

    const model = genAI.getGenerativeModel({
      model: "gemini-1.5-flash",
    });

    const result = await model.generateContent(message);

    // ✅ safest way (official)
    const text = result.response.text();

    res.json({ reply: text });

  } catch (error) {
    console.error("❌ FULL ERROR:", error);

    res.json({
      reply: "AI ERROR: " + error.message,
    });
  }
});