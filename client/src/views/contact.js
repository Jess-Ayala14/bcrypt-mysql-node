import React from 'react';

function Contact() {
  return (
    <article className='content-form'>
      <h1>Contacto</h1>
      <p className='message'>Puedes contactarnos aquí.</p>

      <form className="form contact" action="/send-message" method="POST">
        <div className="form-group">
          <label htmlFor="name">Nombre:</label>
          <input type="text" id="name" name="name" required />
        </div>

        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input type="email" id="email" name="email" required />
        </div>
        <div className="form-group">
          <label htmlFor="message">Mensaje:</label>
          <textarea id="message" name="message" rows="4" required></textarea>
        </div>
        <div className="form-actions">
          <button className="submit" type="submit">Enviar</button>
        </div>
      </form>

    </article>
  );
}

export default Contact;