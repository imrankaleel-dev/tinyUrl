const express = require("express");
const dotEnv = require("dotenv");
const cors = require("cors");
const path = require("path");

// database
const initializeDatabase = require("./services/initialize.database");

// import routes
const linksRoutes = require("./routes/links.routes");
const stableRoutes = require("./routes/stable.routes");

dotEnv.config();

const app = express();

app.use(cors());
app.use(express.json());

// Serve static React build folder
app.use(express.static(path.join(__dirname, "./public/build")));

// routes
app.use("/", stableRoutes);
app.use("/api", linksRoutes);

// React Router support → return index.html for all non-API routes
app.get(/.*/, (req, res) => {
  res.sendFile(path.join(__dirname, "public", "build", "index.html"));
});

const startServer = async () => {
  try {
    await initializeDatabase();
    console.log("Database connected");

    const PORT = process.env.PORT;
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Database initialization failed:", error);
    process.exit(1); // Stop server
  }
};

startServer();
