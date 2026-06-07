// routes/adminRoutes.js 
const router = require('express').Router();
const adminController = require('../controllers/adminController');
const authenticateToken = require('../middlewares/auth');

// solo admin
router.post('/time-blocks', authenticateToken, adminController.createTimeBlock);

// Ruta protegida para listar todas las reservaciones (solo admin)
router.get('/reservations', authenticateToken, adminController.listReservations);

module.exports = router;