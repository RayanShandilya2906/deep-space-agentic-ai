const Analysis =
require("../models/Analysis");

exports.getHistory =
async (req, res) => {

  const history =
    await Analysis.find()
      .sort({ createdAt: -1 })
      .select(
        "objectName type summary objectImage recommendations createdAt"
      )
      .lean();

  res.json({
    success: true,
    history
  });

};
