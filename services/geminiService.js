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
  "interesting_facts": [
    "",
    "",
    ""
  ],
  "recommendations": [
    "",
    "",
    "",
    ""
  ]
}

Rules:
- Return valid JSON only.
- No markdown.
- Summary under 50 words.
- Exactly 4 related celestial objects.
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
- Return valid JSON only.
- No markdown.
- Summary under 50 words.
- Exactly 4 related celestial objects.
`);

  return result.response.text();
}

async function getAstronomyFact(objectName) {
  const model = genAI.getGenerativeModel({
    model: "gemini-2.5-flash",
  });

  const result = await model.generateContent(`
You are an astronomy expert.

Write one short, accurate astronomy fact about "${objectName}".

Rules:
- Return plain text only.
- One sentence only.
- Under 25 words.
- No markdown.
`);

  return result.response.text().trim().replace(/^"|"$/g, "");
}

async function compareObjects(
  objectA,
  objectB
) {

  const model =
    genAI.getGenerativeModel({
      model: "gemini-2.5-flash"
    });

  const result =
    await model.generateContent(`

Compare ${objectA} and ${objectB}.

Return ONLY valid JSON:

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
- Return valid JSON only.
- No markdown.
- Summary under 50 words.
- Exactly 3 interesting facts.

`);

  return result.response.text();

}

async function getTimeline(objectName) {

  const model =
    genAI.getGenerativeModel({
      model: "gemini-2.5-flash"
    });

  const result =
    await model.generateContent(`

You are an astronomy historian.

Provide a space exploration timeline
for ${objectName}.

Return ONLY valid JSON:

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
- JSON only.
- 5 major events.
- Chronological order.
- No markdown.

`);

  return result.response.text();
}

module.exports = {
  analyzeSpaceImage,
  getObjectDetails,
  getAstronomyFact,
  compareObjects,
  getTimeline
};
