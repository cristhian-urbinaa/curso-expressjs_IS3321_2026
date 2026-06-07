const reservationService = require('../services/reservation.service');

const reservationController = {

    async create(req, res) {
        try {
            const reservation = await reservationService.create(req.body);

            return res.status(201).json({
                message: 'Reserva creada correctamente',
                reservation
            });

        } catch (error) {
            return res.status(400).json({ error: error.message });
        }
    },

    async edit(req, res) {
        try {
            const updated = await reservationService.edit(req.params.id, req.body);

            return res.status(200).json({
                message: 'Actualizada correctamente',
                reservation: updated
            });

        } catch (error) {

            if (error.message.includes('no existe')) {
                return res.status(404).json({ error: error.message });
            }

            return res.status(400).json({ error: error.message });
        }
    },

    async delete(req, res) {
       try {
           await reservationService.delete(req.params.id);

           return res.status(200).json({
            message: "Reserva eliminada correctamente"
        });

        } catch (error) {

            if (error.message.includes('no existe')) {
                return res.status(404).json({ error: error.message });
            }

            return res.status(400).json({ error: error.message });
        }
    },

    async get(req, res) {
        try {
            const reservation = await reservationService.get(req.params.id);

            if (!reservation) {
                return res.status(404).json({
                    error: 'La reserva no existe'
                });
            }

            return res.status(200).json(reservation);

        } catch (error) {
            return res.status(400).json({ error: error.message });
        }
    },

    async getAll(req, res) {
        try {
            const reservations = await reservationService.getAll();

            return res.status(200).json(reservations);

        } catch (error) {
            return res.status(400).json({ error: error.message });
        }
    },

    // Endpoint para obtener las reservas del usuario autenticado
    async getMyReservations(req, res) {
        try {
            const userId = req.user.id;

            const reservations = await reservationService.getByUser(userId);

            return res.status(200).json(reservations);

        } catch (error) {
            return res.status(400).json({ error: error.message });
        }
    }

};

module.exports = reservationController;