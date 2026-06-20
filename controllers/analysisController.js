const Analysis =
  require("../models/Analysis");
const { analyzeSpaceImage } = require("../services/geminiService");
const {
  getNASAImage
} = require(
  "../services/nasaService"
);

exports.analyzeImage = async (req, res) => {
  try {
    const aiResponse = await analyzeSpaceImage(req.file.path);

    const cleaned = aiResponse
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .trim();

    const parsed = JSON.parse(cleaned);
    await Analysis.create({
      objectName: parsed.name,
      type: parsed.type,
      summary: parsed.summary,
      recommendations:
        parsed.recommendations,
      imagePath: req.file.path
    });
    const enrichedRecommendations =
      await Promise.all(

        parsed.recommendations.map(
          async (name) => ({

            name,

            image:
              await getNASAImage(name)

          })
        )

      );

    parsed.recommendations =
      enrichedRecommendations;

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