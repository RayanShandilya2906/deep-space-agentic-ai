const {
  compareObjects
} = require(
  "../services/geminiService"
);

exports.compare =
async (req, res) => {

  try {

    const { a, b } =
      req.params;

    const aiResponse =
      await compareObjects(
        a,
        b
      );

    const cleaned =
      aiResponse
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .trim();

    const parsed =
      JSON.parse(cleaned);

    res.json({
      success: true,
      data: parsed
    });

  } catch (error) {

    console.error(error);

    res.status(500).json({
      success: false
    });

  }

};