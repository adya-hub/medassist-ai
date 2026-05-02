const genAI = require("../utils/gemini");

exports.handleAnalyze = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    const { mimetype, buffer } = req.file;

    // Determine the inlineData mimeType. Gemini supports PDF and images.
    // Ensure we handle PDF vs Image correctly
    const inlineData = {
      data: buffer.toString("base64"),
      mimeType: mimetype
    };

    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

    const prompt = `
      You are MedAssist AI, a highly professional AI health assistant.
      CRITICAL MEDICAL GUARDRAILS:
      1. You are NOT a doctor. You must NEVER provide a medical diagnosis or prescribe medications.
      2. Always maintain a neutral, objective, and safe tone.
      3. For any symptom or medical query, you MUST conclude by advising them to consult a healthcare professional.

      Please analyze the uploaded medical report.
      
      Requirements:
      1. Explain the report in simple language.
      2. Highlight any abnormal values.
      3. Explain complex medical terms found in the report.
      4. Give general educational advice only.
      
      Structure your response exactly like this (use ## for headers):
      
      ## Title
      [A brief title for the report]
      ## Summary
      [Short simple summary]
      ## Key Points
      [Bulleted points of normal/abnormal findings]
      ## Advice
      [General educational advice]
      ## When to See a Doctor
      [Advice on when to seek professional help]
    `;

    const result = await model.generateContent([
      prompt,
      { inlineData }
    ]);
    
    let responseText = result.response.text();

    return res.json({ result: responseText });

  } catch (error) {
    console.error("Analyze Error:", error);
    return res.status(500).json({ error: "Failed to process the report" });
  }
};
