import React, { useEffect, useState } from 'react';

function Home() {
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

  const capFname = (string) => {
    if(!string) return ''
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  const formatFname = capFname(user.fname);

  return (
    <article className="content">
      <h1>¡Bienvenido, {formatFname}!</h1>
      <p className='message'>Este es tu panel de inicio privado.</p>
      <p className='message'>Tu email es: {user.email}</p>
    </article>
  );
}

export default Home;