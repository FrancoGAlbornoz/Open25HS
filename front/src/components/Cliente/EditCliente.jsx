// EditClient.jsx
import React, { useState, useEffect } from 'react';
import useLoginStore from '../../store/useLoginStore';
import { useNavigate } from 'react-router-dom';
import { Button, Form, Card } from 'react-bootstrap';
import axios from 'axios';

// Permite a un cliente editar su perfil 
const EditClient = () => {
  const { user, setUser } = useLoginStore((state) => state); // Obtengo el usuario actual y la función para actualizarlo
  const navigate = useNavigate();
  const [form, setForm] = useState({
    nombre: '',
    direccion: '',
    mail: '',
    telefono: '',
  });

  useEffect(() => {
    if (user?.idCliente) {
      axios.get(`http://localhost:8000/api/clientes/${user.idCliente}`)
        .then(res => setForm(res.data))
        .catch(err => console.error('Error al obtener cliente:', err));
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:8000/api/clientes/${user.idCliente}`, form);
      setUser({ ...user, ...form }); // actualiza estado global
      navigate('/dashboard-cliente/perfil');
      alert('Datos actualizados');
    } catch (error) {
      console.error('Error al actualizar datos:', error);
      alert('Hubo un error al guardar los datos');
    }
  };

  return (
    <div className="container mt-4">
      <h2>Editar Perfil</h2>
      <Card className="p-4 shadow-sm">
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Nombre</Form.Label>
            <Form.Control type="text" name="nombre" value={form.nombre} onChange={handleChange} />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Dirección</Form.Label>
            <Form.Control type="text" name="direccion" value={form.direccion} onChange={handleChange} />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Mail</Form.Label>
            <Form.Control type="email" name="mail" value={form.mail} onChange={handleChange} />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Teléfono</Form.Label>
            <Form.Control type="text" name="telefono" value={form.telefono} onChange={handleChange} />
          </Form.Group>

          <Button variant="success" type="submit">Guardar Cambios</Button>
        </Form>
      </Card>
      <br />
    </div>
  );
};

export default EditClient;