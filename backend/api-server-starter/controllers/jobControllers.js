const Job = require("../models/jobModel.js");


const getJobs = async (req, res) => {
    const jobs = await Job.find();

    res.status(200).json(jobs);
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
    createJob,
    updateJob,
    deleteJob
};