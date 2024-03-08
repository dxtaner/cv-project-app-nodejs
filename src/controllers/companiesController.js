const Company = require("../models/company.js");

const createCompany = async (req, res) => {
  try {
    const {
      name,
      phone,
      email,
      companyName,
      city,
      state,
      diversityInclusionCommittee,
    } = req.body;

    const existingCompany = await Company.findOne({ email });

    if (existingCompany) {
      return res.json({ success: false, error: "E-posta zaten kayıtlı" });
    }

    const newCompany = new Company({
      name,
      phone,
      email,
      companyName,
      city,
      state,
      diversityInclusionCommittee,
    });

    const savedCompany = await newCompany.save();

    res.status(201).json({ success: true, data: savedCompany });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ success: false, error: "Şirket oluşturulurken bir hata oluştu" });
  }
};

const getAllCompanies = async (req, res) => {
  try {
    const companies = await Company.find().populate("jobs");

    res.status(200).json({ success: true, data: companies });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      error: "Şirketler alınırken bir hata oluştu",
    });
  }
};
const getCompanyById = async (req, res) => {
  try {
    const companyId = req.params.id;

    const company = await Company.findById(companyId).populate("jobs");
    if (!company) {
      return res.status(404).json({
        success: false,
        error: "Belirtilen şirket bulunamadı",
      });
    }

    res.status(200).json({ success: true, data: company });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      error: "Şirket getirilirken bir hata oluştu",
    });
  }
};

const putCompany = async (req, res) => {
  try {
    const companyId = req.params.id;
    const updateData = req.body;

    if (updateData.email) {
      return res.status(400).json({
        success: false,
        error: "E-posta adresi güncellenemez",
      });
    }

    const company = await Company.findByIdAndUpdate(companyId, updateData, {
      new: true,
      runValidators: true,
    });

    if (!company) {
      return res.status(404).json({
        success: false,
        error: "Belirtilen şirket bulunamadı",
      });
    }

    res.status(200).json({ success: true, data: company });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      error: "Şirket güncellenirken bir hata oluştu",
    });
  }
};

const deleteCompany = async (req, res) => {
  try {
    const companyId = req.params.id;

    const company = await Company.findById(companyId);
    if (!company) {
      return res.status(404).json({
        success: false,
        error: "Belirtilen şirket bulunamadı",
      });
    }

    await Company.deleteOne({ _id: companyId });

    res.status(200).json({ success: true, data: {} });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      error: "Şirket silinirken bir hata oluştu",
    });
  }
};

module.exports = {
  getAllCompanies,
  createCompany,
  getCompanyById,
  putCompany,
  deleteCompany,
};
