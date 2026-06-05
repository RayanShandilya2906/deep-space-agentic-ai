const express = require("express");
const cors = require("cors");

const analysisRoutes = require("./routes/analysisRoutes");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api", analysisRoutes);

app.get("/", (req, res) => {
  res.send("Deep Space Agent Backend Running");
});

app.listen(5000, () => {
  console.log("Server running on port 5000");
});