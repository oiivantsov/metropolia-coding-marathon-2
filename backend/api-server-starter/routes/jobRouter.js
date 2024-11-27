const express = require("express");
const router = express.Router();

const { getJobs, createJob, updateJob, deleteJob } = require("../controllers/jobControllers.js");
  
// get jobs route
router.get("/", getJobs);
  
// create job route
router.post("/create", createJob);

// update job route
router.put("/:id", updateJob);

// create job route
router.delete("/:id", deleteJob);


module.exports = router;