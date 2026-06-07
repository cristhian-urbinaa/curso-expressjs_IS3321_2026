// controllers/adminController.js
const { createTimeBlockService, listReservationService } = require('../services/adminService');

const createTimeBlock = async (req, res) => {
    // Verificar si el usuario tiene rol de administrador
    if (req.user.role !== 'admin') {
        return res.status(403).json({ error: 'Access Denied' });
    }

    // Obtener datos del cuerpo de la solicitud
    const { startTime, endTime } = req.body;

    try {
        const newTimeBlock = await createTimeBlockService(startTime, endTime);
        res.status(201).json(newTimeBlock);
    } catch (error) {
        res.status(500).json({ error: 'Error creating time block' });
    }
};

const listReservations = async (req, res) => {
    // Verificar si el usuario tiene rol de administrador
    if (req.user.role !== 'admin') {
        return res.status(403).json({ error: 'Access Denied' });
    }
    try {
        // CORRECCIÓN: Quitamos la 's' extra para que coincida con la importación
        const reservations = await listReservationService();
        res.json(reservations);
    } catch (error) {
    console.error("ERROR DETALLADO:", error);
    res.status(500).json({ 
        error: 'Error obteniendo las reservaciones',
        detalle: error.message 
    });
}
};

module.exports = {
    createTimeBlock,
    listReservations
};