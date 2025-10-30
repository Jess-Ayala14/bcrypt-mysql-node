import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; 

function Login({ onLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate(); 
  const [errorData, setErrorData] = useState(null);
  

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });

      if (res.ok) {
        const data = await res.json();
        onLogin(data.token);
        localStorage.setItem('token', data.token);
        alert('¡Inicio de sesión exitoso!');
        navigate('/home'); 
      } else {
        setErrorData(await res.json());
        alert(`Error al iniciar sesión: ${errorData.error}`);
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Hubo un problema con la conexión.');
    }
  };

  return (
    <article className='content-form'>
      {errorData &&
        <div className="error">
          {errorData}
        </div>

      }

      <h1>Iniciar Sesión</h1>
      <form className='login' onSubmit={handleLogin}>
        <div className='form-group'>
          <label htmlFor="email">Email:</label>
          <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </div>
        <div className='form-group'>
          <label htmlFor="password">Contraseña:</label>
          <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        </div>
        <div className='form-actions'>
          <button className='submit' type="submit">Entrar</button>
        </div>  
        <div className='form-links'>
          <Link href="/signup">Regístrate aquí</Link>
          <Link href="/forgot-password">¿Olvidaste tu contraseña?</Link>
        </div>
        
      </form>
    </article>
  );
}

export default Login;