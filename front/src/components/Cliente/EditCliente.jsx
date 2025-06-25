// EditClient.jsx
import React, { useState } from 'react';
import useLoginStore from '../../store/useLoginStore';
import { useNavigate } from 'react-router-dom';
import { Button, Form, Card } from 'react-bootstrap';
import axios from 'axios';

const EditClient = () => {
  const { user, setUser } = useLoginStore((state) => state);
  const navigate = useNavigate();

  const [form, setForm] = useState({
    nombre: user?.nombre || '',
    direccion: user?.direccion || '',
    mail: user?.mail || '',
    telefono: user?.telefono || '',
    // agregá más campos si es necesario
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:8000/api/clientes/${user.idCliente}`, form);
      setUser({ ...user, ...form }); // actualiza el estado global
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
            <Form.Control type="text" name="nombre" value={form.nombre} onChange={handleChange}/>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Direccion</Form.Label>
            <Form.Control type="text" name="direccion" value={form.direccion} onChange={handleChange}/>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Mail</Form.Label>
            <Form.Control type="mail" name="mail" value={form.mail} onChange={handleChange}/>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Telefono</Form.Label>
            <Form.Control type="number" name="telefono" value={form.telefono} onChange={handleChange}/>
          </Form.Group>

          <Button variant="success" type="submit">Guardar Cambios</Button>
        </Form>
        
      </Card>
      <br />
    </div>
  );
};

export default EditClient;
