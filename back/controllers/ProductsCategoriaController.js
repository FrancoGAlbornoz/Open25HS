const { connection } = require("../Database/config")


//modal para ver productos públicos
const getProductosPublicos = (req, res) => {
  const sql = `
    SELECT 
      p.idProducto,
      p.nombre,
      p.precioVenta,
      p.imagen,
      p.stock,  
      c.nombre AS nombre_categoria
    FROM Producto p
    JOIN Categoria c ON p.idCategoria = c.idCategoria
    WHERE p.eliminado = 0;
  `;

  connection.query(sql, (error, results) => {
    if (error) throw error;
    res.json(results);
  });
};

module.exports = { getProductosPublicos };
