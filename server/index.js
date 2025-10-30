const express = require('express');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('./db');
require('dotenv').config();
console.log('Variables de entorno cargadas. Puerto:', process.env.PORT);

const app = express();
app.use(cors());
app.use(express.json());

const JWT_SECRET = process.env.JWT_SECRET;

// Middleware para verificar el token en rutas protegidas
const verifyToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  if (!authHeader) {
    return res.status(401).json({ error: 'Token no proporcionado' });
  }

  const token = authHeader.split(' ')[1];
  if (!token) {
    return res.status(401).json({ error: 'Token no proporcionado' });
  }

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ error: 'Token inválido' });
    }
    req.user = user;
    next();
  });
};

// ---------------- Rutas Públicas ----------------

// Ruta de Registro de Usuario
app.post('/api/signup', async (req, res) => {
  const { fname, lastname, email, password } = req.body;
  
  if (!email || !password) {
    return res.status(400).json({ error: 'Email y contraseña son requeridos' });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const sql = 'INSERT INTO users (fname, lastname, email, password) VALUES (?, ?, ?, ?)';
    db.query(sql, [fname, lastname, email, hashedPassword], (err, result) => {
      if (err) {
        if (err.code === 'ER_DUP_ENTRY') {
          return res.status(409).json({ error: 'El correo electrónico ya está registrado.' });
        }
        console.error('Error en el registro:', err);
        return res.status(500).json({ error: 'Error al registrar el usuario' });
      }
      res.status(201).json({ mensaje: 'Usuario registrado con éxito' });
    });
  } catch (error) {
    console.error('Error al encriptar la contraseña:', error);
    res.status(500).json({ error: 'Error del servidor' });
  }
});

// Ruta de Inicio de Sesión
app.post('/api/login', (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ error: 'Email y contraseña son requeridos' });
  }

  const sql = 'SELECT * FROM users WHERE email = ?';
  db.query(sql, [email], async (err, results) => {
    if (err) {
      console.error('Error en el login:', err);
      return res.status(500).json({ error: 'Error del servidor' });
    }
    if (results.length === 0) {
      return res.status(401).json({ error: 'Credenciales inválidas' });
    }

    const user = results[0];
    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.status(401).json({ error: 'Credenciales inválidas' });
    }

    const token = jwt.sign({ id: user.id, email: user.email, fname: user.fname }, JWT_SECRET, { expiresIn: '1h' });
    res.json({ token, user: { id: user.id, fname: user.fname, email: user.email } });
  });
});

// Esta ruta ya no se usa, pero se deja como referencia del proyecto original
app.get('/usuarios', (req, res) => {
  db.query('SELECT * FROM users', (err, results) => {
    if (err) {
      console.error('Error en la consulta:', err);
      res.status(500).json({ error: 'Error en la base de datos' });
    } else {
      res.json(results);
    }
  });
});


// ---------------- Rutas Protegidas ----------------

// Ejemplo de ruta protegida para obtener datos del usuario logueado
app.get('/api/me', verifyToken, (req, res) => {
  const userId = req.user.id;
  const sql = 'SELECT id, fname, lastname, email FROM users WHERE id = ?';
  db.query(sql, [userId], (err, results) => {
    if (err || results.length === 0) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }
    res.json(results[0]);
  });
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});