import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function Inicio() {
  const [users, setUsuarios] = useState([]);

  useEffect(() => {
    fetch('/usuarios')
      .then(res => res.json())
      .then(data => setUsuarios(data))
      .catch(err => console.error('Error:', err));
  }, []);

  return (
    <article className="content">
      <h1>Lista de Usuarios</h1>
      <p className='message'>Esta es la página de inicio, mostrando datos desde tu base de datos MySQL.</p>

      <div class="content-action">
        <Link to="/signup" class="btn singup">Registrarse</Link>
        <Link to="/login" class="btn login">Iniciar Sesión</Link>
      </div>
    </article>
  );
}

export default Inicio;