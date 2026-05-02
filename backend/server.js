const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const { GoogleGenerativeAI } = require("@google/generative-ai");

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  console.log("❌ API KEY MISSING");
} else {
  console.log("✅ API KEY LOADED");
}

const genAI = new GoogleGenerativeAI(API_KEY);

// root test
app.get("/", (req, res) => {
  res.send("Backend is running 🚀");
});

// chat route (safe)
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

    let text = "No response";

    try {
      text = result.response.text();
    } catch (e) {
      console.log("⚠️ fallback response used");
    }

    res.json({ reply: text });

  } catch (error) {
    console.error("❌ ERROR:", error);
    res.json({ reply: "AI ERROR: " + error.message });
  }
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log("Server running on port " + PORT);
});