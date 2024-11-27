const express = require("express");
const router = express.Router();

const { getJobs, createJob, updateJob, deleteJob } = require("../controllers/jobControllers.js");

// get jobs route
router.get("/", requireAuth, getJobs);

// everyone can see the jobs, but only authenticated users can create, update,
const requireAuth = require("../middleware/requireAuth.js");
  
// create job route
router.post("/create", requireAuth, createJob);

// update job route
router.put("/:id", requireAuth, updateJob);

// create job route
router.delete("/:id", requireAuth, deleteJob);


module.exports = router;