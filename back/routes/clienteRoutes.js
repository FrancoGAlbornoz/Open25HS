const express = require('express');
const router = express.Router();
const { getClienteById, updateCliente, createCliente  } = require('../controllers/clienteController');

router.get('/:id', getClienteById);
router.put('/:id', updateCliente);
router.post('/', createCliente)

module.exports = router;