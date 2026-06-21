require("dotenv").config();
const connectDB =
require("./config/db");
console.log(
  "Gemini key loaded:",
  !!process.env.GEMINI_API_KEY
);
const express = require("express");
const app = express();
const cors = require("cors");
const cleanupOldRecords =
require("./services/cleanupService");
const analysisRoutes = require("./routes/analysisRoutes");
const objectRoutes = require("./routes/objectRoutes");
const compareRoutes =
require("./routes/compareRoutes");
const timelineRoutes =
require("./routes/timelineRoutes");
const historyRoutes =
require("./routes/historyRoutes");
const statsRoutes =
require("./routes/statsRoutes");
const cron =
require("node-cron");
cron.schedule(
  "0 0 * * *",
  cleanupOldRecords
);

app.use(cors());
app.use(express.json());
app.use(
  "/images",
  express.static("public-images")
);
app.use("/api", analysisRoutes);
app.use("/api/object", objectRoutes);
app.use("/api/compare", compareRoutes);
app.use("/api/history", historyRoutes);
app.use(
  "/api/stats",
  statsRoutes
);
app.use("/api/timeline", timelineRoutes);

app.get("/", (req, res) => {
  res.send("Deep Space Agent Backend Running");
});

async function startServer() {
  await connectDB();

  app.listen(process.env.PORT || 5000, () => {
    console.log(
      `Server running on port ${process.env.PORT || 5000}`
    );
  });
}

startServer();