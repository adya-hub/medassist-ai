const genAI = require("../utils/gemini");

exports.handleChat = async (req, res) => {
  try {
    const { message, history = [] } = req.body;

    if (!message) {
      return res.status(400).json({ error: "Message is required" });
    }

    if (message.length > 800) {
      return res.status(400).json({ error: "Message exceeds 800 characters limit." });
    }

    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

    // Format history for context
    const recentHistory = history.slice(-4); // last 2 interactions (2 user, 2 ai)
    const historyText = recentHistory.map(h => `${h.role}: ${h.text}`).join('\n');

    const prompt = `
      You are MedAssist AI, a highly professional AI health assistant.
      CRITICAL MEDICAL GUARDRAILS:
      1. You are NOT a doctor. You must NEVER provide a medical diagnosis or prescribe medications.
      2. Always maintain a neutral, objective, and safe tone.
      3. For any symptom or medical query, you MUST conclude by advising them to consult a healthcare professional.

      Previous Context:
      ${historyText}

      Current User Query: ${message}

      STRICT RESPONSE FORMAT:
      If the user is asking a medical or health-related question, you MUST format your response exactly with these headers (use ## for headers):
      ## Title
      [Brief title]
      ## Summary
      [Short summary of the topic]
      ## Key Points
      [Bullet points]
      ## Advice
      [General educational advice]
      ## When to See a Doctor
      [Specific signs requiring medical attention]

      If the query is a simple greeting or non-medical, you may respond naturally, but always stay safe.
    `;

    const result = await model.generateContent(prompt);
    let responseText = result.response.text();

    return res.json({ reply: responseText });
  } catch (error) {
    console.error("Chat Error:", error);
    return res.status(500).json({ error: "Server busy or failed to process chat query. Please try again." });
  }
};
