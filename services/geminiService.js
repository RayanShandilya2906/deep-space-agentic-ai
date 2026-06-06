const fs = require("fs");
const path = require("path");
const { GoogleGenerativeAI } = require("@google/generative-ai");
console.log("KEY LENGTH:", process.env.GEMINI_API_KEY?.length);
console.log(
  "KEY PREFIX:",
  process.env.GEMINI_API_KEY?.substring(0, 6)
);
const genAI = new GoogleGenerativeAI(
    process.env.GEMINI_API_KEY
);

async function analyzeSpaceImage(imagePath) {

    const model = genAI.getGenerativeModel({
        model: "gemini-2.5-flash"
    });

    const imageData = fs.readFileSync(imagePath);
    const ext = path.extname(imagePath).toLowerCase();

let mimeType = "image/jpeg";

if (ext === ".png") {
    mimeType = "image/png";
}

    const result = await model.generateContent([
        {
            inlineData: {
                data: imageData.toString("base64"),
                mimeType: mimeType
            }
        },
        `
        You are an astronomy expert.

Analyze this astronomical image.

If you can identify the object, return:

{
  "name":"",
  "type":"",
  "summary":""
}

Rules:
- Return valid JSON only.
- No markdown.
- No explanation outside JSON.
- Keep summary under 50 words.
- If uncertain, provide the most likely celestial object.
        `
    ]);

    return result.response.text();
}

module.exports = analyzeSpaceImage;