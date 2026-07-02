const fs = require("fs");
const path = require("path");
const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const model = genAI.getGenerativeModel({
  model: "gemini-2.5-flash-lite",
});

// -----------------------------
// Shared Helpers
// -----------------------------
async function askJSON(prompt) {
  const result = await model.generateContent(prompt);

  return result.response
    .text()
    .replace(/```json/g, "")
    .replace(/```/g, "")
    .trim();
}

async function askText(prompt) {
  const result = await model.generateContent(prompt);

  return result.response
    .text()
    .replace(/^"|"$/g, "")
    .trim();
}

// -----------------------------
// Analyze Uploaded Image
// -----------------------------
async function analyzeSpaceImage(imagePath) {
  const imageData = fs.readFileSync(imagePath);

  const ext = path.extname(imagePath).toLowerCase();

  const mimeType =
    ext === ".png"
      ? "image/png"
      : ext === ".webp"
      ? "image/webp"
      : "image/jpeg";

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

Return ONLY valid JSON.

{
  "name":"",
  "type":"",
  "summary":"",
  "interesting_facts":[
    "",
    "",
    ""
  ],
  "recommendations":[
    "",
    "",
    "",
    ""
  ]
}

Rules:
- Valid JSON only
- No markdown
- Summary under 50 words
- Exactly 3 interesting facts
- Exactly 4 related celestial objects
`,
  ]);

  return result.response
    .text()
    .replace(/```json/g, "")
    .replace(/```/g, "")
    .trim();
}

// -----------------------------
// Compare Objects
// -----------------------------
async function compareObjects(objectA, objectB) {
  return askJSON(`
Compare ${objectA} and ${objectB}.

Return ONLY valid JSON.

{
  "objectA":"",
  "objectB":"",
  "similarities":[
    "",
    "",
    ""
  ],
  "differences":[
    "",
    "",
    ""
  ]
}

Rules:
- JSON only
- Exactly 3 similarities
- Exactly 3 differences
`);
}

// -----------------------------
// Exploration Timeline
// -----------------------------
async function getTimeline(objectName) {
  return askJSON(`
You are an astronomy historian.

Provide a space exploration timeline for "${objectName}".

Return ONLY valid JSON.

{
  "object":"",
  "timeline":[
    {
      "year":"",
      "event":""
    }
  ]
}

Rules:
- JSON only
- 5 major events
- Chronological order
`);
}

module.exports = {
  analyzeSpaceImage,
  compareObjects,
  getTimeline,
};