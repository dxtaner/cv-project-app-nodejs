const Candidate = require("../models/candidates");

const createCandidate = async (req, res) => {
  try {
    const {
      fullName,
      email,
      birthDate,
      phone,
      city,
      state,
      educationalLevel,
      language,
      whatLanguages,
      jobs,
    } = req.body;

    if (!fullName || !email) {
      return res.status(400).json({
        message:
          "Eksik bilgi girdiniz. Ad ve e-posta alanları doldurulmalıdır.",
        success: false,
      });
    }

    const existingCandidate = await Candidate.findOne({ email });

    if (existingCandidate) {
      return res.status(400).json({
        message:
          "Bu e-posta adresi zaten kullanılmış. Lütfen farklı bir e-posta adresi girin.",
        success: false,
      });
    }

    const newCandidate = new Candidate({
      fullName,
      email,
      birthDate,
      phone,
      city,
      state,
      educationalLevel,
      language,
      whatLanguages,
      jobs,
    });

    const savedCandidate = await newCandidate.save();

    return res.status(201).json({
      message: "Aday başarıyla oluşturuldu",
      candidate: savedCandidate,
      success: true,
    });
  } catch (err) {
    return res.status(500).json({
      message: "Aday oluşturulurken bir hata oluştu.",
      error: err.message,
      success: false,
    });
  }
};

const getAllCandidates = async (req, res) => {
  try {
    const candidates = await Candidate.find();

    return res.status(200).json({ candidates });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

const getCandidateByLanguage = async (req, res) => {
  try {
    const candidates = await Candidate.find();
    const { languages } = req.query;
    if (!languages) {
      return res
        .status(400)
        .json({ message: "Dil bilgisi belirtilmelidir.", success: false });
    }

    const languageArray = Array.isArray(languages) ? languages : [languages];
    const matchedCandidates = [];

    for (const candidate of candidates) {
      for (const language of candidate.whatLanguages) {
        if (language.includes(languageArray)) {
          matchedCandidates.push(candidate);
          break;
        }
      }
    }

    return res
      .status(200)
      .json({ candidates: matchedCandidates, success: true });
  } catch (err) {
    return res.status(500).json({ message: err.message, success: false });
  }
};

const getById = async (req, res) => {
  try {
    const { id } = req.params;

    const candidate = await Candidate.findById(id);

    if (!candidate) {
      return res
        .status(404)
        .json({ message: "Aday bulunamadı.", success: false });
    }

    return res.status(200).json({ candidate, success: true });
  } catch (err) {
    return res.status(500).json({ message: err.message, success: false });
  }
};

const putCandidate = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    const updatedCandidate = await Candidate.findByIdAndUpdate(id, updateData, {
      new: true,
    });

    if (!updatedCandidate) {
      return res
        .status(404)
        .json({ message: "Aday bulunamadı.", success: false });
    }

    return res.status(200).json({ success: true, candidate: updatedCandidate });
  } catch (err) {
    return res.status(500).json({ message: err.message, success: false });
  }
};

const deleteCandidate = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedCandidate = await Candidate.findByIdAndDelete(id);

    if (!deletedCandidate) {
      return res
        .status(404)
        .json({ message: "Aday bulunamadı.", success: false });
    }

    return res.status(201).json({ success: true });
  } catch (err) {
    return res.status(500).json({ message: err.message, success: false });
  }
};

module.exports = {
  createCandidate,
  getAllCandidates,
  putCandidate,
  getCandidateByLanguage,
  getById,
  deleteCandidate,
};
