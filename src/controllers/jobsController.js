const Company = require("../models/company.js");
const Job = require("../models/job.js");

const createJob = async (req, res) => {
  try {
    const companyId = req.params.companyId;
    const { title, description, remote, requirements } = req.body;

    if (
      !title ||
      !description ||
      typeof remote !== "boolean" ||
      !Array.isArray(requirements)
    ) {
      return res.status(400).json({
        success: false,
        error: "Eksik veya hatalı iş ilanı bilgileri gönderildi",
      });
    }

    const jobData = {
      title,
      description,
      remote,
      requirements,
    };

    const newJob = new Job(jobData);
    await newJob.save();

    const company = await Company.findById(companyId);
    company.jobs.push(newJob._id);
    await company.save();

    res.status(201).json({ success: true, data: newJob });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      error: "İş ilanı oluşturulurken bir hata oluştu",
    });
  }
};

const getAllJobs = async (req, res) => {
  try {
    const companyId = req.params.id;

    const company = await Company.findById(companyId).populate("jobs");
    if (!company) {
      return res.status(404).json({
        success: false,
        error: "Belirtilen şirket bulunamadı",
      });
    }

    const jobs = company.jobs;

    res.status(200).json({ success: true, data: jobs });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      error: "İş ilanları alınırken bir hata oluştu",
    });
  }
};

const getJobById = async (req, res) => {
  try {
    const companyId = req.params.companyId;
    const jobId = req.params.jobId;

    // Şirketi bulun
    const company = await Company.findById(companyId);
    if (!company) {
      return res.status(404).json({
        success: false,
        error: "Belirtilen şirket bulunamadı",
      });
    }

    const job = await Job.findById(jobId);
    if (!job) {
      return res.status(404).json({
        success: false,
        error: "Belirtilen iş ilanı bulunamadı",
      });
    }

    res.status(200).json({ success: true, data: job });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      error: "İş ilanı getirilirken bir hata oluştu",
    });
  }
};

const putJob = async (req, res) => {
  try {
    const companyId = req.params.companyId;
    const jobId = req.params.jobId;
    const updateData = req.body;

    const company = await Company.findById(companyId);
    if (!company) {
      return res.status(404).json({
        success: false,
        error: "Belirtilen şirket bulunamadı",
      });
    }

    const job = await Job.findById(jobId);
    if (!job) {
      return res.status(404).json({
        success: false,
        error: "Belirtilen iş ilanı bulunamadı",
      });
    }

    job.set(updateData);
    await company.save();

    res.status(200).json({ success: true, data: job });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      error: "İş ilanı güncellenirken bir hata oluştu",
    });
  }
};

const deleteJob = async (req, res) => {
  try {
    const companyId = req.params.companyId;
    const jobId = req.params.jobId;

    const company = await Company.findById(companyId);
    if (!company) {
      return res.status(404).json({
        success: false,
        error: "Belirtilen şirket bulunamadı",
      });
    }

    const job = await Job.findById(jobId);
    if (!job) {
      return res.status(404).json({
        success: false,
        error: "Belirtilen iş ilanı bulunamadı",
      });
    }

    await Job.deleteOne({ _id: jobId });

    res.status(200).json({ success: true, data: {} });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      error: "İş ilanı silinirken bir hata oluştu",
    });
  }
};

module.exports = {
  getAllJobs,
  createJob,
  putJob,
  getJobById,
  deleteJob,
};
