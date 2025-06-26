// controllers/pedidoController.js
const { connection } = require('../Database/config');

const crearPedido = (req, res) => {
  const { idCliente, items } = req.body;

  if (!idCliente || !items || items.length === 0) {
    return res.status(400).json({ error: 'Faltan datos para crear el pedido' });
  }

  const fecha = new Date();
  const hoyFecha = fecha.toISOString().split('T')[0]; // YYYY-MM-DD
  const hora = fecha.toTimeString().split(' ')[0];     // HH:MM:SS

  // Insertar el pedido
  const pedidoQuery = 'INSERT INTO Pedido (fecha, hora, idCliente) VALUES (?, ?, ?)';
  connection.query(pedidoQuery, [hoyFecha, hora, idCliente], (err, result) => {
    if (err) {
      console.error('Error al insertar pedido:', err);
      return res.status(500).json({ error: 'Error al insertar pedido' });
    }

    const idPedido = result.insertId;

    // Ahora insertamos los detalles
    const detalleQuery = `
      INSERT INTO DetallePedido (idPedido, idProducto, cantidad, subtotal) VALUES ?
    `;
    const detalleValues = items.map(item => [
      idPedido,
      item.idProducto,
      item.cantidad,
      item.precio * item.cantidad
    ]);

    connection.query(detalleQuery, [detalleValues], (err2, result2) => {
      if (err2) {
        console.error('Error al insertar detalle:', err2);
        return res.status(500).json({ error: 'Error al insertar detalles' });
      }

      res.status(201).json({ message: 'Pedido creado correctamente', idPedido });
    });
  });
};

module.exports = { crearPedido };
