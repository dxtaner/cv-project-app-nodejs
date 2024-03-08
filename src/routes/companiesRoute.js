const express = require("express");
const router = express.Router();
const authMiddleware = require("../middlewares/auth");

const companyController = require("../controllers/companiesController.js");
const jobController = require("../controllers/jobsController.js");

router.use(authMiddleware);

router.post("/", companyController.createCompany);
router.post("/:companyId/jobs", jobController.createJob);

router.get("/", companyController.getAllCompanies);
router.get("/:id/jobs", jobController.getAllJobs);

router.get("/:id", companyController.getCompanyById);
router.get("/:companyId/jobs/:jobId", jobController.getJobById);

router.put("/:id", companyController.putCompany);
router.put("/:companyId/jobs/:jobId", jobController.putJob);

router.delete("/:id", companyController.deleteCompany);
router.delete("/:companyId/jobs/:jobId", jobController.deleteJob);

module.exports = router;
