const { GoogleGenerativeAI } = require("@google/generative-ai");

// Initialize the Google Generative AI with the API key from environment variables
const genAI = new GoogleGenerativeAI(process.env.API_KEY || "");

module.exports = genAI;
