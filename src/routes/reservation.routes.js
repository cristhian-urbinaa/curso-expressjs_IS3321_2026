const { Router } = require('express');
const router = Router();

const controller = require('../controllers/reservationController');

// Crear reserva
router.post('/', controller.create);

// Ver todas las reservas
router.get('/', controller.getAll);

// Ver una reserva por ID
router.get('/:id', controller.get);

// Editar reserva
router.put('/:id', controller.edit);

// Eliminar reserva
router.delete('/:id', controller.delete);

module.exports = router;