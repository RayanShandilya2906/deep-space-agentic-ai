const {
  getTimeline
} = require("../services/geminiService");

exports.timeline = async (req,res) => {

  try {

    const objectName =
      req.params.object;

    const response =
      await getTimeline(objectName);

    const cleaned =
      response
      .replace(/```json/g,"")
      .replace(/```/g,"")
      .trim();

    const parsed =
      JSON.parse(cleaned);

    res.json({
      success:true,
      data:parsed
    });

  } catch(error) {

    console.error(error);

    res.status(500).json({
      success:false,
      message:"Timeline failed"
    });

  }

};