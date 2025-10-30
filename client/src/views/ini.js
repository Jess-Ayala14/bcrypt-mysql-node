import React, { useEffect, useState } from 'react';

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
      {/*
      <ul>
        {users.map(user => (
          <li key={user.id}>{user.fname} {user.email}</li>
        ))}
      </ul>
      */}
    </article>
  );
}

export default Inicio;