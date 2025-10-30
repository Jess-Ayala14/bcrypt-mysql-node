import React, { useEffect, useState } from 'react';

function Settings() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem('token');
      if (!token) return;

      try {
        const res = await fetch('/api/me', {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        if (res.ok) {
          const userData = await res.json();
          setUser(userData);
        } else {
          localStorage.removeItem('token');
        }
      } catch (error) {
        console.error('Error:', error);
      }
    };
    fetchUser();
  }, []);

  if (!user) {
    return <div>Cargando...</div>;
  }

  return (
    <article className="content">
      <h1>Configuraciones de Usuario</h1>
      <p className='message'>Aquí puedes ver la información de tu perfil:</p>

      <div className="user-data">
        <h2>Datos del Perfil</h2>
        <p><strong>Nombre:</strong> {user.fname}</p>
        <p><strong>Apellido:</strong> {user.lastname || 'No especificado'}</p>
        <p><strong>Email:</strong> {user.email}</p>
      </div>
    </article>
  );
}

export default Settings;