const { getObjectDetails } = require("../services/geminiService");

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
      data: parsed,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch object details",
    });
  }
};