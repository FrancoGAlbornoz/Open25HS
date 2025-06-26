const {connection} = require('../Database/config');


const getAllUsuario = (req, res) => {
    const query = "SELECT * FROM Usuario WHERE idRol = 2"
    connection.query(query, (error, results) => {
        if (error) throw error
        res.json(results)
    })
}

// Crear un nuevo Usuario
const createUsuario = (req,res) =>{
  const {nombre, mail,contraseña, idRol} = req.body

  const query = `INSERT INTO Usuario (nombre, mail, contraseña, idRol) VALUES (?,?,?,2)` 
  const values = [nombre,mail,contraseña,idRol];

  connection.query(query,values, (error,results)=>{
    if (error) throw error
    res.json({ message: "Usuario creado correctamente", insertId: results.insertId })
  })


}

//Obtengo un usuario por ID
const getUsuarioById = (req, res) => {
  const id = req.params.id

  const query = 'SELECT * FROM Usuario WHERE idUsuario = ?'
    connection.query(query, [id], (err, results) => {
    if (err) {
      console.error('Error al obtener Usuario:', err)
      return res.status(500).json({ error: 'Error en el servidor' })
    }

    if (results.length === 0) {
      return res.status(404).json({ error: 'Usuario no encontrado' })
    }

    res.json(results[0]);
  });
};

//Actualizar Usuario
const updateUsuario = (req,res) =>{
  const id = req.params.id;

  const { nombre, mail, contraseña, idRol } = req.body;

  const query = `UPDATE Usuario SET nombre = ?,  mail = ?, idRol = ? WHERE idUsuario = ?`
  const values = [nombre,  mail, idRol, id]

  connection.query(query, values, (error, results) => {
    if (error) throw error
      res.json({ message: "Datos actualizados", affectedRows: results.affectedRows });
  });

}


// Eliminar un usuario
const deleteUsuario = (req, res) => {
  const id = req.params.id

  const query = "UPDATE Usuario SET eliminado = 1 WHERE idUsuario = ?"

  connection.query(query, [id], (error, results) => {
    if (error) throw error
    res.json({ message: "Usuario eliminado", affectedRows: results.affectedRows })
  });
};

module.exports = {  createUsuario, getUsuarioById, updateUsuario, getAllUsuario, deleteUsuario };