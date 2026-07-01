const { getObjectDetails } = require("../services/geminiService");
const {
  enrichRecommendations,
  getObjectImage
} = require("../services/recommendationService");
const {
  parseGeminiJson
} = require("../utils/geminiJson");

exports.getObjectInfo = async (req, res) => {
  try {
    const aiResponse = await getObjectDetails(req.params.name);

    const parsed = parseGeminiJson(aiResponse);
    const objectImage =
      await getObjectImage(parsed.name || req.params.name);

    const recommendations =
      await enrichRecommendations(parsed.recommendations);

    res.json({
      success: true,
      data: {
        ...parsed,
        objectImage,
        imageUrl: objectImage,
        recommendations
      },
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch object details",
    });
  }
};
