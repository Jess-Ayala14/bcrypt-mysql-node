import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Signup() {
  const [fname, setFname] = useState('');
  const [lastname, setLastname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorData, setErrorData] = useState(null);
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    // Esta línea es crucial para evitar que la página se recargue
    e.preventDefault();

    // Validación: Comprobar que las contraseñas coincidan
    if (password !== confirmPassword) {
      alert('Las contraseñas no coinciden.');
      return;
    }

    try {
      const res = await fetch('/api/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ fname, lastname, email, password })
      });

      if (res.ok) {
        alert('¡Registro exitoso! Ahora puedes iniciar sesión.');
        navigate('/login');
      } else {
         setErrorData(await res.json());
        alert(`Error al registrarse: ${errorData.error}`);
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Hubo un problema con la conexión.');
    }
  };

  return (
    <article className='content-form '>

      {errorData &&
        <div className="error">
          {errorData}
        </div>
      }
      <h1>Registrarse</h1>
      {/*El 'onSubmit' es la manera correcta de manejar el envío de un formulario */}
      <form className='signup' onSubmit={handleSignup}>
        <div className='form-group'>
          <label htmlFor="fname">Nombre:</label>
          <input type="text" id="fname" value={fname} onChange={(e) => setFname(e.target.value)} required />
        </div>
        <div className='form-group'>
          <label htmlFor="lastname">Apellido:</label>
          <input type="text" id="lastname" value={lastname} onChange={(e) => setLastname(e.target.value)} />
        </div>
        <div className='form-group'>
          <label htmlFor="email">Email:</label>
          <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </div>
        <div className='form-group'>
          <label htmlFor="password">Contraseña:</label>
          <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        </div>
        <div className='form-group'>
          <label htmlFor="confirmPassword">Confirmar Contraseña:</label>
          <input type="password" id="confirmPassword" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required />
        </div>
        <div className='form-actions'>
          <button className="submit" type="submit">Registrarme</button>
        </div>
      </form>
    </article>
  );
}

export default Signup;