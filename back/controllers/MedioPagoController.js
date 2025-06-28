const { connection } = require('../Database/config');

// Obtener todos los medios de pago
const getMediosPago = (req, res) => {
  const query = 'SELECT * FROM MedioPago';
  connection.query(query, (err, results) => {
    if (err) {
      console.error('Error al obtener medios de pago:', err);
      return res.status(500).json({ error: 'Error al obtener medios de pago' });
    }
    res.json(results);
  });
};

// Crear nuevo medio de pago
const crearMedioPago = (req, res) => {
  const { nombre } = req.body;

  if (!nombre) {
    return res.status(400).json({ error: 'El nombre del medio de pago es obligatorio' });
  }

  const query = 'INSERT INTO MedioPago (nombre) VALUES (?)';
  connection.query(query, [nombre], (err, result) => {
    if (err) {
      console.error('Error al crear medio de pago:', err);
      return res.status(500).json({ error: 'Error al crear medio de pago' });
    }
    res.status(201).json({ message: 'Medio de pago creado correctamente', id: result.insertId });
  });
};

// Eliminar medio de pago
const eliminarMedioPago = (req, res) => {
  const { id } = req.params;

  const query = 'DELETE FROM MedioPago WHERE idMedioPago = ?';
  connection.query(query, [id], (err) => {
    if (err) {
      console.error('Error al eliminar medio de pago:', err);
      return res.status(500).json({ error: 'Error al eliminar medio de pago' });
    }
    res.json({ message: 'Medio de pago eliminado correctamente' });
  });
};

module.exports = {
  getMediosPago,
  crearMedioPago,
  eliminarMedioPago,
};
