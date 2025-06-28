const express = require('express');
const router = express.Router();
const { getMediosPago,  crearMedioPago,  eliminarMedioPago} = require('../controllers/MedioPagoController');

router.get('/', getMediosPago);
router.post('/', crearMedioPago);
router.delete('/:id', eliminarMedioPago);

module.exports = router;
