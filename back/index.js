//Exporto o requiero EXPRESS y mysql
const express = require ("express")
const mysql = require("mysql")
const cors = require("cors")

//Se instancia la libreria express
const app = express()

//Se usa la libreria y metodos internos
app.use(express.json())
app.use(cors())

//Se hace la conexion con nuestra base de datos.
const connection = mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"123456789",
    database:"drugstore25"
})
//Me informa si hay un error o si se conecta a la bd correctamente.
connection.connect((error)=>{
    if(error) throw error
    console.log("Conectado a la DB");
})

app.get("/",(req, res)=>{
    //requiere and response
    console.log("Wlcm t my API")

})
//Obtengo los productos de mi bd.
app.get("/products",(req,res)=>{
    connection.query("select * from Producto;",(error, results)=>{
        if (error) throw error
        res.json(results)
    })
})

//Obtengo (con el id) un producto en específico  de mi bd.
app.get("/products/:id", (req, res) => {
    const id = req.params.id

    connection.query("SELECT * FROM Producto WHERE idProducto = ?", [id], (error, results) => {
        if (error) throw error
        res.json(results)
    });
});

//voy agregando un producto nuevo
app.post("/products", (req, res) => {
    console.log(req.body)

    const { nombre, descripcion, stock, precioVenta, precioCompra, idProveedor, idCategoria, idMarca, imagen } = req.body

    const query = `
        INSERT INTO Producto
        (nombre, descripcion, stock, precioVenta, precioCompra, idProveedor, idCategoria, idMarca, imagen)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?);
    `;

    const values = [nombre, descripcion, stock, precioVenta, precioCompra, idProveedor, idCategoria, idMarca, imagen]

    connection.query(query, values, (error, results) => {
        if (error) throw error
        res.json({ message: "Producto creado correctamente", insertId: results.insertId })
    });
});

//actualizo un producto.
app.put("/products/:id", (req, res) => {

    const id = req.params.id
    const {nombre, descripcion, stock, precioVenta, precioCompra, idProveedor, idCategoria, idMarca, imagen} = req.body

    const query = `
        UPDATE Producto 
        SET nombre = ?, descripcion = ?, stock = ?, precioVenta = ?, precioCompra = ?, idProveedor = ?, idCategoria = ?, idMarca = ?, imagen = ? 
        WHERE idProducto = ?;
    `;

    const values = [nombre, descripcion, stock, precioVenta, precioCompra, idProveedor, idCategoria, idMarca, imagen, id]

    connection.query(query, values, (error, results) => {
        if (error) throw error;
        res.json({ message: "Producto actualizado correctamente", affectedRows: results.affectedRows })
    });
});


//elimino un producto
app.delete("/products/:id",(req,res)=>{
    const id = req.params.id
    const query = `DELETE FROM Producto WHERE idProducto = ${id}`
    connection.query(query,(error,results)=>{
        if (error) throw error
        res.json(results)
    })
})


app.listen(8000,()=>{
    console.log("Escuchando puerto 8000");
})


//ENDPOINTS PARA CATEGORIAS, PROVEEDOR y MARCA.

app.get("/categorias", (req, res) => {
  connection.query("SELECT * FROM Categoria;", (error, results) => {
    if (error) throw error
    res.json(results)
  });
});

app.get("/marcas", (req, res) => {
  connection.query("SELECT * FROM Marca;", (error, results) => {
    if (error) throw error
    res.json(results)
  });
});


app.get("/proveedores", (req, res) => {
  connection.query("SELECT * FROM Proveedor;", (error, results) => {
    if (error) throw error
    res.json(results)
  })
});
