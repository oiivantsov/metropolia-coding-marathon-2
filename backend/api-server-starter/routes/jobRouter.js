const express = require("express");
const router = express.Router();

const { getJobs, getJobById, createJob, updateJob, deleteJob } = require("../controllers/jobControllers.js");

const requireAuth = require("../middleware/requireAuth.js");

// Get all jobs route
router.get("/", getJobs);

// Get a specific job by ID route
router.get("/:id", requireAuth, getJobById);

// Create job route
router.post("/create", requireAuth, createJob);

// Update job route
router.put("/:id", requireAuth, updateJob);

// Delete job route
router.delete("/:id", requireAuth, deleteJob);

module.exports = router;