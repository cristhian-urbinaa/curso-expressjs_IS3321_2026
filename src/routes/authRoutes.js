const express = require('express');
const router = express.Router();

const authController = require('../controllers/authController');
const reservationController = require('../controllers/reservationController');
const authMiddleware = require('../middlewares/auth');

// AUTH
router.get('/db/users', authController.getAllUsers);
router.post('/register', authController.register);
router.post('/login', authController.login);

// RESERVAS
router.post('/reservations', authMiddleware, reservationController.create);
router.get('/reservations', authMiddleware, reservationController.getAll);
router.get('/reservations/:id', authMiddleware, reservationController.get);
router.put('/reservations/:id', authMiddleware, reservationController.edit);
router.delete('/reservations/:id', authMiddleware, reservationController.delete);

// MIS RESERVAS (usuario logueado)
router.get('/reservations/my', authMiddleware, reservationController.getMyReservations);

module.exports = router;