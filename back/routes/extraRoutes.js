const express = require ("express")
const router = express.Router()
const { getAllCategorias, getAllMarcas, getAllProveedor} = require("../controllers/extraControllers.js")

router.get("/categorias", getAllCategorias)
router.get("/marcas", getAllMarcas)
router.get("/proveedores", getAllProveedor)

module.exports=router