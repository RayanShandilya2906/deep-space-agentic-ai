const Analysis =
require("../models/Analysis");

exports.getStats =
async (req, res) => {

  const totalAnalyses =
    await Analysis.countDocuments();

  const topObjects =
    await Analysis.aggregate([
      {
        $group: {
          _id: "$objectName",
          count: { $sum: 1 }
        }
      },
      {
        $sort: { count: -1 }
      },
      {
        $limit: 5
      }
    ]);

  const today = new Date();

  today.setHours(
    0, 0, 0, 0
  );

  const todayAnalyses =
    await Analysis.countDocuments({
      createdAt: {
        $gte: today
      }
    });

  res.json({
    success: true,
    totalAnalyses,
    todayAnalyses,
    topObjects
  });

};