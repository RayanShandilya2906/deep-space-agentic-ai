const Analysis = require("../models/Analysis"); 
const {
  enrichRecommendations,
  getObjectImage
} = require("../services/recommendationService");

exports.getObjectInfo = async (req, res) => {
  try {
    const record = await Analysis.findOne({
    objectName: req.params.name
});

    const objectImage =
      await getObjectImage(record.objectName);

    const recommendations =
      await enrichRecommendations(record.recommendations);

    res.json({
    success: true,

    data: {
        name: record.objectName,
        type: record.type,
        summary: record.summary,
        objectImage: record.objectImage,
        interesting_facts: record.interestingFacts,
        recommendations: record.recommendations
    }
}); 
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch object details",
    });
  }
};
