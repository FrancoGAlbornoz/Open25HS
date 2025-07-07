const { connection } = require("../Database/config.js")

const loginUser = (req, res) => {
  // Verificar que se reciban los datos necesarios del cuerpo de la solicitud
  const { mail, contraseña } = req.body

  // Buscar primero en tabla usuario
  const userQuery = `
    SELECT u.*, r.nombre as rol
    FROM Usuario u
    JOIN Rol r ON u.idRol = r.idRol
    WHERE u.mail = ?`

  // Conecction a la base de datos con [mail] como parametro
  connection.query(userQuery, [mail], (err, userResults) => {
    // Si hay un error en la consulta, devolver error 500
    if (err) return res.status(500).json({ message: "Error del servidor (usuario)" })
      // Si la longitud de usuario es mayor a 1, quiere decir que se encontro al usuario(admin o empleado), verificar contraseña
    if (userResults.length > 0) {
      const user = userResults[0]
      // Si la contraseña coincide, devolver datos del usuario
      if (user.contraseña === contraseña) {
        return res.json({
          idUsuario: user.idUsuario,
          nombre: user.nombre,
          mail: user.mail,
          rol: user.rol // 'admin' o 'empleado'
        });
      } else {
        return res.status(401).json({ message: "Contraseña incorrecta" })
      }
    }

    // Si no está en Usuario, buscar en Cliente

    const clienteQuery = `
      SELECT c.*, r.nombre as rol
      FROM Cliente c
      JOIN Rol r ON c.idRol = r.idRol
      WHERE c.mail = ?`;
    // Conecction a la base de datos con [mail] como parametro
    connection.query(clienteQuery, [mail], (err, clienteResults) => {
      if (err) return res.status(500).json({ message: "Error del servidor (cliente)" })
      // Si la longitud de cliente es mayor a 1, quiere decir que se encontro al cliente, verificar contraseña
      if (clienteResults.length > 0) {
        const cliente = clienteResults[0]
        if (cliente.contraseña === contraseña) {
          return res.json({
            idCliente: cliente.idCliente,
            nombre: cliente.nombre,
            mail: cliente.mail,
            rol: cliente.rol
          });
        } else {
          return res.status(401).json({ message: "Contraseña incorrecta" })
        }
      } else {
        return res.status(401).json({ message: "Usuario no encontrado" })
      }
    });
  });
};

module.exports = { loginUser };
