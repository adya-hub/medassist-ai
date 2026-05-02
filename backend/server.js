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

    const model = genAI.getGenerativeModel({
      model: "gemini-1.5-flash",
    });

    const result = await model.generateContent(message);
    const text = result.response.text();

    res.json({ reply: text });

  } catch (error) {
    console.error("❌ Gemini Error:", error.message);
    res.json({ reply: "Error: " + error.message });
  }
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log("Server running on port " + PORT);
});