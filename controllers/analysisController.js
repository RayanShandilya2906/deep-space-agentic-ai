const { analyzeSpaceImage } = require("../services/geminiService");

exports.analyzeImage = async (req, res) => {
  try {
    const aiResponse = await analyzeSpaceImage(req.file.path);

    const cleaned = aiResponse
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .trim();

    const parsed = JSON.parse(cleaned);

    res.json({
      success: true,
      data: parsed,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "AI analysis failed",
    });
  }
};