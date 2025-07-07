const { connection } = require('../Database/config');

// Crea un nuevo pedido, verifica stock, inserta detalles, actualiza stock y registra el pago
const crearPedido = (req, res) => {
  const { idCliente, items, idMedioPago, observaciones } = req.body;

  // Validación de datos obligatorios
  if (!idCliente || !idMedioPago || !items || items.length === 0) {
    return res.status(400).json({ error: 'Faltan datos para crear el pedido' });
  }

  // Obtiene la fecha y hora actual en formato adecuado
  const fecha = new Date();
  const hoyFecha = fecha.toISOString().split('T')[0];
  const hora = fecha.toTimeString().split(' ')[0];

  let totalCompra = 0;
  let verificados = 0;
  let stockInsuficiente = false;
  let yaRespondio = false;

  // Verifica el stock de cada producto en el pedido
  items.forEach((item) => {
    const queryStock = 'SELECT stock FROM Producto WHERE idProducto = ?';

    connection.query(queryStock, [item.idProducto], (err, results) => {
      if (yaRespondio) return;

      // Manejo de error en la consulta de stock
      if (err) {
        console.error('Error al verificar stock:', err);
        yaRespondio = true;
        return res.status(500).json({ error: 'Error al verificar stock' });
      }

      // Si el producto no existe
      if (results.length === 0) {
        yaRespondio = true;
        return res.status(404).json({ error: `Producto con ID ${item.idProducto} no encontrado` });
      }

      const stockDisponible = results[0].stock;
      // Si no hay suficiente stock
      if (stockDisponible < item.cantidad) {
        yaRespondio = true;
        stockInsuficiente = true;
        return res.status(400).json({ error: `Stock insuficiente para el producto con ID ${item.idProducto}` });
      }

      // Suma el subtotal del producto al total de la compra
      totalCompra += item.precio * item.cantidad;
      verificados++;

      // Cuando todos los productos fueron verificados y hay stock suficiente
      if (verificados === items.length && !stockInsuficiente) {
        // Inserta el pedido en la tabla Pedido
        const pedidoQuery = 'INSERT INTO Pedido (fecha, hora, idCliente, estado, observaciones) VALUES (?, ?, ?, ?, ?)';
        connection.query(pedidoQuery, [hoyFecha, hora, idCliente, 'pendiente', observaciones || 'Sin observaciones.'], (err, result) => {
          if (err) {
            console.error('Error al insertar pedido:', err);
            return res.status(500).json({ error: 'Error al insertar pedido' });
          }

          const idPedido = result.insertId;

          // Inserta los detalles del pedido (productos, cantidades, subtotales)
          const detalleQuery = 'INSERT INTO DetallePedido (idPedido, idProducto, cantidad, subtotal) VALUES ?';
          const detalleValues = items.map(item => [
            idPedido,
            item.idProducto,
            item.cantidad,
            item.precio * item.cantidad
          ]);

          connection.query(detalleQuery, [detalleValues], (err) => {
            if (err) {
              console.error('Error al insertar detalle:', err);
              return res.status(500).json({ error: 'Error al insertar detalles' });
            }

            let stockActualizados = 0;
            let errorStock = false;

            // Actualiza el stock de cada producto
            items.forEach((item) => {
              const updateStockQuery = 'UPDATE Producto SET stock = stock - ? WHERE idProducto = ?';
              connection.query(updateStockQuery, [item.cantidad, item.idProducto], (err) => {
                if (err) {
                  console.error('Error al actualizar stock:', err);
                  errorStock = true;
                }

                stockActualizados++;
                // Cuando todos los stocks fueron actualizados
                if (stockActualizados === items.length) {
                  if (errorStock) {
                    return res.status(500).json({ error: 'Error al actualizar stock' });
                  }

                  // Inserta el pago del pedido
                  const pagoQuery = 'INSERT INTO Pago (fechaPago, idPedido, idMedioPago, total) VALUES (?, ?, ?, ?)';
                  connection.query(pagoQuery, [hoyFecha, idPedido, idMedioPago, totalCompra], (err) => {
                    if (err) {
                      console.error('Error al insertar pago:', err);
                      return res.status(500).json({ error: 'Error al registrar el pago' });
                    }

                    // Responde con éxito y el id del pedido creado
                    return res.status(201).json({ message: 'Pedido y pago registrados correctamente', idPedido });
                  });
                }
              });
            });
          });
        });
      }
    });
  });
};

// Obtiene todos los pedidos de un cliente específico
const getPedidosByCliente = (req, res) => {
  const idCliente = req.params.id;

  const query = `
    SELECT 
      p.idPedido, 
      p.fecha, 
      p.hora, 
      p.estado, 
      p.observaciones, 
      SUM(d.subtotal) AS total
    FROM Pedido p
    JOIN DetallePedido d ON p.idPedido = d.idPedido
    WHERE p.idCliente = ?
    GROUP BY p.idPedido
    ORDER BY p.fecha DESC, p.hora DESC;
  `;
  connection.query(query, [idCliente], (err, results) => {
    if (err) {
      console.error('Error al obtener pedidos del cliente:', err);
      return res.status(500).json({ error: 'Error en el servidor' });
    }

    res.json(results);
  });
};

// Obtiene todos los pedidos del sistema
const getAllPedidos = (req, res) => {
  const query = "SELECT idPedido, fecha, hora, idCliente, estado, observaciones FROM Pedido ORDER BY fecha DESC, hora DESC";
  connection.query(query, (error, results) => {
    if (error) {
      console.error('Error al obtener pedidos:', error);
      return res.status(500).json({ error: 'Error en el servidor' });
    }
    res.json(results);
  });
};

// Obtiene un pedido por su ID, incluyendo sus productos y pago
const getPedidoById = (req, res) => {
  const id = req.params.id;

  // Consulta para obtener los datos principales del pedido
  const pedidoQuery = `
    SELECT idPedido, fecha, hora, idCliente, estado, observaciones 
    FROM Pedido 
    WHERE idPedido = ?
  `;

  // Consulta para obtener los productos del pedido
  const productosQuery = `
    SELECT dp.idProducto, p.nombre AS nombreProducto, p.imagen, dp.cantidad, dp.subtotal
    FROM DetallePedido dp
    JOIN Producto p ON dp.idProducto = p.idProducto
    WHERE dp.idPedido = ?
  `;

  // Consulta para obtener el pago del pedido
  const pagoQuery = `
    SELECT pg.total, mp.nombre AS medioPago
    FROM Pago pg
    JOIN MedioPago mp ON pg.idMedioPago = mp.idMedioPago
    WHERE pg.idPedido = ?
  `;

  // Ejecuta la consulta principal del pedido
  connection.query(pedidoQuery, [id], (error, pedidoResults) => {
    if (error) {
      console.error('Error al obtener pedido:', error);
      return res.status(500).json({ error: 'Error al obtener el pedido' });
    }

    if (pedidoResults.length === 0) {
      return res.status(404).json({ error: 'Pedido no encontrado' });
    }

    const pedido = pedidoResults[0];

    // Consulta los productos del pedido
    connection.query(productosQuery, [id], (error, productosResults) => {
      if (error) {
        console.error('Error al obtener productos del pedido:', error);
        return res.status(500).json({ error: 'Error al obtener productos' });
      }

      // Consulta el pago del pedido
      connection.query(pagoQuery, [id], (error, pagoResults) => {
        if (error) {
          console.error('Error al obtener pago del pedido:', error);
          return res.status(500).json({ error: 'Error al obtener pago' });
        }

        const pago = pagoResults.length > 0 ? pagoResults[0] : null;

        // Devuelve toda la información del pedido
        res.json({
          ...pedido,
          productos: productosResults,
          pago: pago
        });
      });
    });
  });
};

// Actualiza los datos de un pedido por su ID
const updatePedido = (req, res) => {
  const id = req.params.id;
  let { fecha, hora, idCliente, estado, observaciones } = req.body;

  // Formatea la fecha si viene en formato ISO
  if (fecha && fecha.includes('T')) {
    fecha = fecha.split('T')[0];
  }

  // Formatea la hora si viene con segundos extra
  if (hora && hora.includes(':')) {
    hora = hora.split(':').slice(0, 3).join(':').substring(0, 8);
  }

  const query = `
    UPDATE Pedido
    SET fecha = ?, hora = ?, idCliente = ?, estado = ?, observaciones = ?
    WHERE idPedido = ?
  `;
  connection.query(query, [fecha, hora, idCliente, estado, observaciones, id], (error) => {
    if (error) {
      console.error('Error al actualizar pedido:', error);
      return res.status(500).json({ error: 'Error en el servidor' });
    }
    res.json({ message: 'Pedido actualizado correctamente' });
  });
};

// Elimina un pedido y sus relaciones (pagos y detalles)
const deletePedido = (req, res) => {
  const id = req.params.id;

  // Elimina primero los pagos relacionados
  connection.query("DELETE FROM Pago WHERE idPedido = ?", [id], (error) => {
    if (error) {
      console.error('Error al eliminar pagos:', error);
      return res.status(500).json({ error: 'Error al eliminar pagos' });
    }

    // Luego elimina los detalles del pedido
    connection.query("DELETE FROM DetallePedido WHERE idPedido = ?", [id], (error2) => {
      if (error2) {
        console.error('Error al eliminar detalles:', error2);
        return res.status(500).json({ error: 'Error al eliminar detalles' });
      }

      // Finalmente elimina el pedido
      connection.query("DELETE FROM Pedido WHERE idPedido = ?", [id], (error3) => {
        if (error3) {
          console.error('Error al eliminar pedido:', error3);
          return res.status(500).json({ error: 'Error al eliminar pedido' });
        }
        res.json({ message: 'Pedido eliminado correctamente' });
      });
    });
  });
};

// Exporta todas las funciones del controlador
module.exports = {
  crearPedido,
  getPedidosByCliente,
  getAllPedidos,
  getPedidoById,
  updatePedido,
  deletePedido
};