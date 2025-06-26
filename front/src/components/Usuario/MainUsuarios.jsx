import React, {useEffect, useState} from 'react'
import axios from 'axios'
import {Table, Button, Container} from 'react-bootstrap'
import {FaEye, FaEdit, FaTrash} from 'react-icons/fa'
import {useNavigate} from 'react-router-dom'
import {BASE_URL_usuarios} from '../../constants/constant'
import useLoginStore from '../../store/useLoginStore'

const MainUsuarios = () => {

  const [usuarios, setUsuarios] = useState([])
  const navigate = useNavigate();

  const hasPermission = useLoginStore((state)=> state.hasPermission);
  
  
  const getUsuarios = async () =>{
    try {
      const response = await axios.get(BASE_URL_usuarios)
      setUsuarios(response.data)
    } catch (error) {
      console.error("Error al obtener usuarios", error);
    }
  }
  const handleDelete = async (id) => {
    console.log("ID a eliminar:", id);
    if (!window.confirm("¿Estás seguro de que querés eliminar este usuario?")) return;
    try {
      const response = await axios.delete(`${BASE_URL_usuarios}/${id}`);
      console.log("Respuesta del backend:", response.data);
      setUsuarios((prev) => prev.filter((u) => u.idUsuario !== id));
      Swal.fire('Eliminado', 'El usuario fue eliminado correctamente', 'success');
    } catch (error) {
      console.error("Error al eliminar usuario:", error);
    }
  };

  useEffect(() => {
    getUsuarios()
  }, [])

  return (
    <div>
      <Container className="mt-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2>Lista de USuarios</h2>

        {/* <Button variant="primary" onClick={() => navigate("/products/create")}>Crear Producto</Button> */}
        {/* Mostrar botón Crear solo si tiene permiso */}
          {hasPermission('create', 'Usuario') && (
            <Button variant="primary" onClick={() => navigate('/usuarios/create')}>
              Crear Usuario
            </Button>
          )}
      </div>

      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Email</th>
            <th>Rol</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {usuarios.map((usuario) => (
            <tr key={usuario.idUsuario}>
              <td>{usuario.idUsuario}</td>
              <td>{usuario.nombre}</td>
              <td>{usuario.mail}</td>
              <td>{usuario.idRol}</td>
              <td className="d-flex gap-2">
                
                {/* <Button variant="success" size="sm" onClick={() => navigate(`/products/view/${product.idProducto}`)}><FaEye /></Button> */}
          {hasPermission('view','Usuario') && (
           <Button
            variant="success"
            size="sm"
            onClick={() => navigate(`/usuarios/view/${usuario.idUsuario}`)}
          >
            <FaEye />
          </Button>
          )}
                {/* <Button variant="warning" size="sm" onClick={() => navigate(`/products/edit/${product.idProducto}`)}><FaEdit /></Button> */}
          {/* Botón de editar solo visible si tiene permiso */}
          {hasPermission('edit', 'Usuario') && (
            <Button
              variant="warning"
              size="sm"
              onClick={() => navigate(`/usuarios/edit/${usuario.idUsuario}`)}
            >
              <FaEdit />
            </Button>
          )}
                {/* <Button variant="danger" size="sm" onClick={() => handleDelete(product.idProducto)}><FaTrash /></Button> */}
           {/* Botón de eliminar solo visible si tiene permiso */}
            {hasPermission('delete', 'Usuario') && (
            <Button
              variant="danger"
              size="sm"
              onClick={() => handleDelete(usuario.idUsuario)             
              }
            >
              <FaTrash />
            </Button>
          )}
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
    </div>
  )
}

export default MainUsuarios