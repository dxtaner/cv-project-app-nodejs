const adminModel = require("../models/admin.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const SECRET = process.env.SECRET;

const createNewAdmin = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "Eksik bilgi girdiniz. Lütfen tüm alanları doldurun.",
      });
    }

    const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
    if (!emailRegex.test(email)) {
      return res
        .status(400)
        .json({ success: false, message: "Geçersiz e-posta adresi." });
    }

    const existingAdmin = await adminModel.findOne({ email });

    if (existingAdmin) {
      return res.status(400).json({
        success: false,
        message: "Bu e-posta adresi zaten kullanılıyor.",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const admin = new adminModel({
      name,
      email,
      password: hashedPassword,
    });

    const savedAdmin = await admin.save();

    return res
      .status(201)
      .json({ success: true, message: "Admin oluşturuldu", admin: savedAdmin });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};

module.exports = { createNewAdmin };

const loginAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;

    const admin = await adminModel.findOne({ email });

    if (!admin) {
      return res
        .status(401)
        .json({ success: false, message: "Kullanıcı bulunamadı." });
    }

    const isPasswordValid = await bcrypt.compare(password, admin.password);

    if (!isPasswordValid) {
      return res
        .status(401)
        .json({ success: false, message: "Geçersiz şifre." });
    }

    const token = jwt.sign({ email: req.body.email }, SECRET);

    return res
      .status(200)
      .json({ success: true, message: "Giriş başarılı", user: admin, token });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};

const updateAdmin = async (req, res) => {
  try {
    const adminId = req.params.id;
    const updates = req.body;

    if (!updates.name || !updates.email) {
      return res.status(400).json({
        success: false,
        message: "Eksik bilgi girdiniz. Lütfen tüm alanları doldurun.",
      });
    }

    const admin = await adminModel.findById(adminId);

    if (!admin) {
      return res
        .status(404)
        .json({ success: false, message: "Admin bulunamadı." });
    }

    if (updates.password) {
      const hashedPassword = await bcrypt.hash(updates.password, 10);
      updates.password = hashedPassword;
    }

    Object.assign(admin, updates);

    const updatedAdmin = await admin.save();

    return res.status(200).json({
      success: true,
      message: "Admin güncellendi",
      admin: updatedAdmin,
    });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};

const removeAdmin = async (req, res) => {
  try {
    const adminId = req.params.id;

    const deletedAdmin = await adminModel.findByIdAndDelete(adminId);

    if (!deletedAdmin) {
      return res.status(404).json({
        success: false,
        message: "Admin bulunamadı veya zaten silinmiş.",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Admin başarıyla silindi",
      admin: deletedAdmin,
    });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};

const getAdmins = async (req, res) => {
  try {
    const admins = await adminModel.find().select("name email");

    return res.status(200).json({ success: true, admins });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};

module.exports = { getAdmins };

module.exports = {
  createNewAdmin,
  getAdmins,
  loginAdmin,
  removeAdmin,
  updateAdmin,
};
