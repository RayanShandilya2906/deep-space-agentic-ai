const { getObjectDetails } = require("../services/geminiService");
const imageMap = require("../utils/imageMap");
exports.getObjectInfo = async (req, res) => {
  try {
    const aiResponse = await getObjectDetails(req.params.name);

    const cleaned = aiResponse
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .trim();

    const parsed = JSON.parse(cleaned);

    res.json({
      success: true,
      data: {
        ...parsed,
        imageUrl: imageMap[parsed.name] || "/images/default.jpg"
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