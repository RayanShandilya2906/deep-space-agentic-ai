const fs = require("fs");
const path = require("path");
const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// -----------------------------
// Analyze uploaded image
// -----------------------------
async function analyzeSpaceImage(imagePath) {
  const model = genAI.getGenerativeModel({
    model: "gemini-2.5-flash",
  });

  const imageData = fs.readFileSync(imagePath);

  const ext = path.extname(imagePath).toLowerCase();
  const mimeType = ext === ".png" ? "image/png" : "image/jpeg";

  const result = await model.generateContent([
    {
      inlineData: {
        data: imageData.toString("base64"),
        mimeType,
      },
    },
    `
You are an astronomy expert.

Analyze this astronomical image.

Return ONLY valid JSON:

{
  "name": "",
  "type": "",
  "summary": "",
  "recommendations": ["", "", ""]
}

Rules:
- Return valid JSON only.
- No markdown.
- Summary under 50 words.
- Exactly 3 related celestial objects.
`,
  ]);

  return result.response.text();
}

// -----------------------------
// Get details by object name
// -----------------------------
async function getObjectDetails(objectName) {
  const model = genAI.getGenerativeModel({
    model: "gemini-2.5-flash",
  });

  const result = await model.generateContent(`
You are an astronomy expert.

Provide information about "${objectName}".

Return ONLY valid JSON:

{
  "name": "",
  "type": "",
  "summary": "",
  "recommendations": ["", "", ""]
}

Rules:
- Return valid JSON only.
- No markdown.
- Summary under 50 words.
- Exactly 3 related celestial objects.
`);

  return result.response.text();
}

module.exports = {
  analyzeSpaceImage,
  getObjectDetails,
};