const express = require("express");
const router = express.Router();

const controller = require("../controllers/adminController.js");

router.post("/", controller.createNewAdmin);
router.post("/login", controller.loginAdmin);

router.put("/:id", controller.updateAdmin);

router.delete("/:id", controller.removeAdmin);

router.get("/admins", controller.getAdmins);

module.exports = router;
