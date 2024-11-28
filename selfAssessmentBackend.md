# **Self-Assessment, Backend**

---

## **Problem 1: Improving Code quality and naming**

### **Initial Issue:**  
We implemented the router.post("/create", requireAuth, createJob);

```javascript
const express = require("express"); const router = express.Router();

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
```

### **Solution:** 
Consistent Route Naming: Use consistent naming conventions for your routes. For example, instead of /create, you could use / with a POST method to create a job.

```javascript
router.post("/", requireAuth, validateJob, createJob);
```

### **Key Lessons Learned:** 
1. **Consistency in Code**: Using consistent naming conventions improves code readability and maintainability.
2. **Best Practices**: Adhering to best practices in route naming helps in creating a more intuitive API.
3. **Code Review**: Regular code reviews can help identify and rectify such inconsistencies early in the development process.


## **Problem 2: Error Handling**

### **Initial Issue:**  
Initially, our application had error handling on few functions.

### **Solution:** 
We implemented error handling on every functions.

```javascript
const Job = require("../models/jobModel.js");


const getJobs = async (req, res) => {
    const limit = parseInt(req.query._limit);
    const jobs = limit 
      ? await Job.find({}).sort({ createdAt: -1 }).limit(limit)
      : await Job.find({}).sort({ createdAt: -1 });
    res.status(200).json(jobs);
};

const getJobById = async (req, res) => {
    const { id } = req.params;
    try {
      const job = await Job.findById(id);
      if (!job) {
        return res.status(404).json({ error: "Job not found" });
      }
      res.status(200).json(job);
    } catch (error) {
      console.error("Error fetching job by ID:", error);
      res.status(500).json({ error: "Server error" });
    }
  };

const createJob = async (req, res) => {
        const newJob = await Job.new(req.body);

        if (newJob.code) {
            return res.status(newJob.code).send(newJob.error);
        }

        res.status(201).send(newJob);
}

const updateJob = async (req, res) => {
    try {
        const updatedJob = await Job.updateOne({_id: req.params.id}, req.body);

        return res.status(200).send(updatedJob);
    } catch (error) {
        return res.status(400).send({error: "Bad request"});
    }
};

const deleteJob = async (req, res) => {
  try {
      const deleted = await Job.deleteOne({_id: req.params.id});
      console.log(deleted);

      if (deleted.deletedCount > 0) {
          return res.sendStatus(204);
      } else {
          return res.status(400).send({error: `No job found with id ${req.params.id}`});
      }
  } catch (error) {
      return res.status(400).send({error: "Bad request"});
  }
};

module.exports = {
    getJobs,
    getJobById,
    createJob,
    updateJob,
    deleteJob
};
```

We updated the code adding try-catch

```javascript
const Job = require("../models/jobModel.js");

// Get all jobs
const getJobs = async (req, res) => {
  try {
    const limit = parseInt(req.query._limit);
    const jobs = limit 
      ? await Job.find({}).sort({ createdAt: -1 }).limit(limit)
      : await Job.find({}).sort({ createdAt: -1 });
    res.status(200).json(jobs);
  } catch (error) {
    console.error("Error fetching jobs:", error);
    res.status(500).json({ error: "Server error" });
  }
};

// Get job by ID
const getJobById = async (req, res) => {
  const { id } = req.params;
  try {
    const job = await Job.findById(id);
    if (!job) {
      return res.status(404).json({ error: "Job not found" });
    }
    res.status(200).json(job);
  } catch (error) {
    console.error("Error fetching job by ID:", error);
    res.status(500).json({ error: "Server error" });
  }
};

// Create a new job
const createJob = async (req, res) => {
  try {
    const newJob = new Job(req.body);
    await newJob.save();
    res.status(201).json(newJob);
  } catch (error) {
    console.error("Error creating job:", error);
    res.status(400).json({ error: "Bad request" });
  }
};

// Update a job
const updateJob = async (req, res) => {
  try {
    const updatedJob = await Job.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedJob) {
      return res.status(404).json({ error: "Job not found" });
    }
    res.status(200).json(updatedJob);
  } catch (error) {
    console.error("Error updating job:", error);
    res.status(400).json({ error: "Bad request" });
  }
};

// Delete a job
const deleteJob = async (req, res) => {
  try {
    const deleted = await Job.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ error: `No job found with id ${req.params.id}` });
    }
    res.sendStatus(204);
  } catch (error) {
    console.error("Error deleting job:", error);
    res.status(400).json({ error: "Bad request" });
  }
};

module.exports = {
  getJobs,
  getJobById,
  createJob,
  updateJob,
  deleteJob
};

```


### **Key Lessons Learned:** 
1. **Comprehensive Error Handling**: Implementing error handling across all functions ensures that the
2. **Consistent Error Responses**: Providing consistent and descriptive error messages helps in debugging and offers better feedback to API consumers.
3. **Code Maintainability:**: Adding try-catch blocks and handling errors properly makes the code more maintainable and easier to understand for future developers.

## **Summary**
Through these fixes, we improved the reliability and user experience of the application:

Improved code quality and readability by using consistent naming conventions for routes.
Implemented comprehensive error handling across all functions, ensuring the application can handle unexpected issues gracefully.

Both solutions reflect our ability to debug effectively, coordinate between backend and frontend, and design modular, maintainable code.
