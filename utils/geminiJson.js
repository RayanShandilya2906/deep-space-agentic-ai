function parseGeminiJson(responseText) {
  const cleaned = responseText
    .replace(/```json/g, "")
    .replace(/```/g, "")
    .trim();

  return JSON.parse(cleaned);
}

module.exports = {
  parseGeminiJson
};
