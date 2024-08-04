require("dotenv").config();

const express = require("express");
const app = express();
const mongoose = require("mongoose");

const cors = require("cors");

// CORS configuration to allow all origins
app.use(
  cors({
    origin: "*", // Allows requests from any origin
  })
);

const userRoutes = require("./route/users");
const showsRoutes = require("./route/shows");

const PORT = 3000;

// Function to connect and establish MongoDB Connection
async function connectDB() {
  try {
    // Use the environment variable
    const DB_URI = process.env.DB_URI;

    await mongoose.connect(DB_URI);
    console.log("Successfully Connected to DB.");
  } catch (error) {
    console.log("Error Connecting to DB", error);
  }
}

connectDB();

app.listen(PORT, function check(error) {
  if (error) console.log("Error in Connection");
  else console.log(`Server Started at port : ${PORT}`);
});

// Middleware to parse JSON bodies
app.use(express.json());

// Use the user routes
app.use("/user", userRoutes);

// Use the Netflix Titles route
app.use("/shows", showsRoutes);
