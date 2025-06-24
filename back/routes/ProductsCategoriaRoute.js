const express = require("express");
const router = express.Router();
const { getProductosPublicos } = require("../controllers/ProductsCategoriaController");

router.get("/productos", getProductosPublicos);

module.exports = router;