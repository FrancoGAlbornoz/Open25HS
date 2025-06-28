const { connection } = require("../Database/config.js")

const loginUser = (req, res) => {
  const { mail, contraseña } = req.body

  // Buscar primero en "Usuario"
  const userQuery = `
    SELECT u.*, r.nombre as rol
    FROM Usuario u
    JOIN Rol r ON u.idRol = r.idRol
    WHERE u.mail = ?`

  connection.query(userQuery, [mail], (err, userResults) => {
    if (err) return res.status(500).json({ message: "Error del servidor (usuario)" })

    if (userResults.length > 0) {
      const user = userResults[0]
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

    connection.query(clienteQuery, [mail], (err, clienteResults) => {
      if (err) return res.status(500).json({ message: "Error del servidor (cliente)" })

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
