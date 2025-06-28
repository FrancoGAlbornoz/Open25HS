const mysql = require("mysql")

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
    console.log("Conectado a la DB")
})

module.exports = {connection};