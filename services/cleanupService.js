const Analysis =
require("../models/Analysis");

async function cleanupOldRecords() {

  const cutoff =
    new Date(
      Date.now() -
      30 * 24 * 60 * 60 * 1000
    );

  await Analysis.deleteMany({
    createdAt: {
      $lt: cutoff
    }
  });

  console.log(
    "Old history cleaned"
  );
}

module.exports =
cleanupOldRecords;