require("dotenv").config();

console.log(
  "Gemini key loaded:",
  !!process.env.GEMINI_API_KEY
);
const express = require("express");
const app = express();
const cors = require("cors");

const analysisRoutes = require("./routes/analysisRoutes");
const objectRoutes = require("./routes/objectRoutes");

app.use(cors());
app.use(express.json());

app.use("/api", analysisRoutes);
app.use("/api/object", objectRoutes);

app.get("/", (req, res) => {
  res.send("Deep Space Agent Backend Running");
});

app.listen(process.env.PORT || 5000, () => {
  console.log(`Server running on port ${process.env.PORT || 5000}`);
});