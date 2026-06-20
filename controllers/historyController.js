const Analysis =
require("../models/Analysis");

exports.getHistory =
async (req, res) => {

  const history =
    await Analysis.find()
      .sort({ createdAt: -1 });

  res.json({
    success: true,
    history
  });

};