const Analysis =
  require("../models/Analysis");
const { analyzeSpaceImage } = require("../services/geminiService");
const {
  enrichRecommendations,
  getObjectImage
} = require(
  "../services/recommendationService"
);
const {
  parseGeminiJson
} = require("../utils/geminiJson");

exports.analyzeImage = async (req, res) => {
  try {
    const aiResponse = await analyzeSpaceImage(req.file.path);

    const parsed = parseGeminiJson(aiResponse);
    const objectImage =
      await getObjectImage(parsed.name);

    const enrichedRecommendations =
      await enrichRecommendations(
        parsed.recommendations
      );

    await Analysis.create({
      objectName: parsed.name,
      type: parsed.type,
      summary: parsed.summary,
      objectImage,
      recommendations:
        enrichedRecommendations,
      interestingFacts:
        parsed.interesting_facts || parsed.interestingFacts || []
    });

    parsed.recommendations =
      enrichedRecommendations;
    parsed.objectImage =
      objectImage;

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
