const Analysis = require("../models/Analysis"); 
const {
  enrichRecommendations,
  getObjectImage
} = require("../services/recommendationService");
const {
  parseGeminiJson
} = require("../utils/geminiJson");

exports.getObjectInfo = async (req, res) => {
  try {
    const record =
await Analysis.findOne({
    objectName: objectName
})
.sort({createdAt:-1});

    const parsed = parseGeminiJson(record.aiResponse);
    const objectImage =
      await getObjectImage(parsed.name || req.params.name);

    const recommendations =
      await enrichRecommendations(parsed.recommendations);

    res.json({

    success:true,

    data:record

});
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch object details",
    });
  }
};
