const express = require('express');
const router = express.Router();
const { getUsuarioById, updateUsuario, createUsuario, getAllUsuario, deleteUsuario  } = require('../controllers/usuariosController');

router.post('/', createUsuario)
router.get('/', getAllUsuario)
router.get('/:id', getUsuarioById);
router.put('/:id', updateUsuario);
router.delete("/:id", deleteUsuario);

module.exports = router;