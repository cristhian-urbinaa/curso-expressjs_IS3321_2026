const mongoose = require('mongoose');

const ReservationSchema = new mongoose.Schema({
    userId: { type: String, required: true },
    serviceType: { type: String, required: true },
    date: { type: Date, required: true },
    status: { type: String, default: 'pendiente' }
});

module.exports = mongoose.model('Reservation', ReservationSchema);