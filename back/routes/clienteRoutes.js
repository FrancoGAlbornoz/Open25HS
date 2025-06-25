
const express = require('express');
const router = express.Router();
const { getClienteById, updateCliente  } = require('../controllers/clienteController');

router.get('/:id', getClienteById);
router.put('/:id', updateCliente);

module.exports = router;