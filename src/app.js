require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const JWT = require('jsonwebtoken');

const loggerMiddleware = require('./middlewares/logger');
const errorHandle = require('./middlewares/errorHandle');
const authenticateToken = require('./middlewares/auth');
const authRoutes = require('./routes/authRoutes');
const adminRoutes = require('./routes/adminRoutes'); 

const reservationRoutes = require('./routes/reservation.routes');

const app = express();

// 1. Middlewares de procesamiento
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(loggerMiddleware);

// 2. Rutas
app.use('/auth', authRoutes);
app.use('/admin', adminRoutes);

app.use('/reservations', reservationRoutes);

app.get('/protected', authenticateToken, (req, res) => {
    res.send("Esta es una ruta protegida");
});

app.get('/generate-token', (req, res) => {
    const token = JWT.sign({ id: 1, username: 'test', role: 'admin' }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ token });
});

app.get('/', (req, res) => {
    res.send(`
    <h1>Curso Express.js</h1>
    <p>Esto es una Aplicación node js con Express.js</p>
    `);
});

app.get('/error', (req, res, next) => {
    next(new Error("Error intencional"));
});

// 3. Manejador de errores
app.use(errorHandle);

module.exports = app;