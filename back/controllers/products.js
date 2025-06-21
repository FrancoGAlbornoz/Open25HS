const { connection } = require ("../Database/config.js")


//Obtengo todos los productos

const getAllProducts = (req,res) =>{
    const query = "SELECT * FROM Producto;"
    connection.query(query,(error,results)=>{
        if(error) throw error
        res.json(results)
    })
}

//Obtengo un solo producto por id

const getProductById = (req,res) =>{

    const id = req.params.id // Extrae o requiere(req express) un valor dinamico (ID), de la url

    const query = "SELECT * FROM Producto WHERE idProducto = ?"

    connection.query(query, [id], (error, results) => {
        if (error) throw error
        res.json(results)
  });
}

//Crear nuevo producto

const createProduct = (req,res) =>{

    const {nombre, descripcion, stock, precioVenta, precioCompra, idProveedor, idCategoria, idMarca, imagen } = req.body

    const query = `INSERT INTO Producto (nombre, descripcion, stock, precioVenta, precioCompra, idProveedor, idCategoria, idMarca, imagen) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`
    
    const values = [nombre, descripcion, stock, precioVenta, precioCompra, idProveedor, idCategoria, idMarca, imagen]

    connection.query(query, values, (error, results) => {
        if (error) throw error
        res.json({ message: "Producto creado correctamente", insertId: results.insertId })
    })

}

//Editar un producto

const updateProduct = (req,res) =>{

    const id= req.params.id

    const {nombre, descripcion, stock, precioVenta, precioCompra, idProveedor, idCategoria, idMarca, imagen } = req.body

    const query = `UPDATE Producto SET nombre = ?, descripcion = ?, stock = ?, precioVenta = ?, precioCompra = ?, idProveedor = ?, idCategoria = ?, idMarca = ?, imagen = ? WHERE idProducto = ?`

    const values = [nombre, descripcion, stock, precioVenta, precioCompra, idProveedor, idCategoria, idMarca, imagen,id]

    connection.query(query, values, (error, results) => {
        if (error) throw error
        res.json({ message: "Producto actualizado correctamente", affectedRows: results.affectedRows });
    })

}

// Eliminar un producto
const deleteProduct = (req, res) => {
  const id = req.params.id


  const query = "DELETE FROM Producto WHERE idProducto = ?"

  connection.query(query, [id], (error, results) => {
    if (error) throw error
    res.json({ message: "Producto eliminado", affectedRows: results.affectedRows })
  });
};

module.exports  = {
    getAllProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct,
}