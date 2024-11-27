require('dotenv').config()
const express = require("express");
const app = express();
const morgan = require("morgan");
const userRouter = require("./routes/userRouter");
const jobRouter = require("./routes/jobRouter");
const { unknownEndpoint,errorHandler } = require("./middleware/customMiddleware");
const connectDB = require("./config/db");
const cors = require("cors");

// Configure CORS
const corsOptions = {
  origin: 'https://metropolia-coding-marathon-2.onrender.com', // deployed frontend URL
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true, // Allow cookies
};

// Middlewares
app.use(cors(corsOptions))
app.use(express.json());
app.use(morgan("dev"));

connectDB();

// Use the userRouter for all /users routes
app.use("/api/users", userRouter);
app.use("/api/jobs", jobRouter);

app.use(unknownEndpoint);
app.use(errorHandler);

const port = process.env.PORT || 4000;
// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
