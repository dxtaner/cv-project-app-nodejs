const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.status(200).send({
    title: "Node.js Programlama - 2023 Backend - Final Adımı",
    version: "1.0.0",
    routes: ["/candidates/", "/companies/"],
  });
});

module.exports = router;
