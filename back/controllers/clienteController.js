const {connection} = require('../Database/config')


// Crrear un nuevo cliente
const createCliente = (req,res) =>{
  const {nombre, mail, telefono, direccion,contraseña} = req.body

  const query = `INSERT INTO Cliente (nombre, mail, telefono, direccion, contraseña, idRol) VALUES (?,?,?,?,?,3)` 
  const values = [nombre,mail, telefono,direccion,contraseña]

  connection.query(query,values, (error,results)=>{
    if (error) throw error
    res.json({ message: "Cliente creado correctamente", insertId: results.insertId })
  })


}

//Cliente por ID
// Obtiene un cliente por su ID 
const getClienteById = (req, res) => {
  const id = req.params.id

  const query = 'SELECT * FROM Cliente WHERE idCliente = ?'
    connection.query(query, [id], (err, results) => {
    if (err) {
      console.error('Error al obtener cliente:', err)
      return res.status(500).json({ error: 'Error en el servidor' })
    }

    if (results.length === 0) {
      return res.status(404).json({ error: 'Cliente no encontrado' })
    }

    res.json(results[0]);
  });
};

//actualiza un cliente por su ID
const updateCliente = (req,res) =>{
  const id = req.params.id;

  const { nombre, direccion, telefono, mail } = req.body

  const query = `UPDATE Cliente SET nombre = ?,  direccion = ?, telefono = ?, mail = ? WHERE idCliente = ?`
  const values = [nombre,  direccion, telefono, mail, id]

  connection.query(query, values, (error, results) => {
    if (error) throw error
      res.json({ message: "Datos actualizados", affectedRows: results.affectedRows })
  });

}

module.exports = {  getClienteById, updateCliente,createCliente };