//Exporto o requiero EXPRESS y mysql
const express = require ("express")
const {connection} = require("./Database/config.js")
const productsRoutes = require("./routes/productRoutes.js")
const infoExtraRoutes = require("./routes/extraRoutes");
const cors = require("cors")

//Se instancia la libreria express
const app = express()

//Se usa la libreria y metodos internos
app.use(express.json())
app.use(cors())

//app.use uso las paginas de los controllers
app.use("/products", productsRoutes) // uso controllers y routes de productos
app.use("/", infoExtraRoutes) // rutas: /categorias, /marcas, /proveedores, /



app.get("/",(req, res)=>{
    //requiere and response
    console.log("Wlcm t my API")

})

//Levanta el servidor o escucha
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
