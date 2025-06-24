//Exporto o requiero EXPRESS y mysql
const express = require ("express")
const {connection} = require("./Database/config.js")
const productsRoutes = require("./routes/productRoutes.js")
const loginRoutes = require('./routes/loginRoutes.js')
const infoExtraRoutes = require("./routes/extraRoutes");
const productosPublicosRoutes = require("./routes/ProductsCategoriaRoute.js");
const cors = require("cors")

//Se instancia la libreria express
const app = express()

//Se usa la libreria y metodos internos
app.use(express.json())
app.use(cors())

//app.use uso las paginas de los controllers
app.use("/login",loginRoutes)// uso controllers y routes de login
app.use("/products", productsRoutes) // uso controllers y routes de productos
app.use("/", infoExtraRoutes) // rutas: /categorias, /marcas, /proveedores, /

app.use("/api", productosPublicosRoutes);


app.get("/", (req, res) => {
  res.send("API Drugstore25 🚀");
});

//Levanta el servidor o escucha
app.listen(8000,()=>{
    console.log("Escuchando puerto 8000");
})
