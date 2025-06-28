const express = require('express');
const router = express.Router();
const { crearPedido, getPedidosByCliente, getAllPedidos, getPedidoById,updatePedido, deletePedido  } = require('../controllers/pedidoController');

router.post('/', crearPedido);
router.get('/cliente/:id', getPedidosByCliente);


router.get('/', getAllPedidos);
router.get('/:id', getPedidoById);
router.put('/:id', updatePedido);
router.delete('/:id', deletePedido);

module.exports = router;