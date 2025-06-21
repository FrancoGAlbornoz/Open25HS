const { connection } = require("../Database/config.js")

const getAllCategorias = (req,res) =>{
    connection.query("SELECT * FROM Categoria;",(error, results)=>{
        if (error) throw error
        res.json(results)
    })
}

const getAllMarcas = (req,res) =>{
    connection.query("SELECT * FROM Marca;",(error, results)=>{
        if (error) throw error
        res.json(results)
    })
}

const getAllProveedor = (req,res) =>{
    connection.query("SELECT * FROM Proveedor;",(error, results)=>{
        if (error) throw error
        res.json(results)
    })
}

module.exports = { getAllCategorias, getAllMarcas, getAllProveedor}