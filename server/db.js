const mysql = require('mysql2');
require('dotenv').config();


const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE
});

/*
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',      // ej. root
  password: 'root1234',
  database: 'prueba'
});*/

connection.connect(err => {
  if (err) {
    console.error('Error al conectar a la base de datos: ' + err.stack);
    return;
  }
  console.log('Conectado a la base de datos con el ID ' + connection.threadId);
});

module.exports = connection;