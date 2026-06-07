const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Crear bloques de tiempo
const createTimeBlockService = async (startTime, endTime) => {
    const newTimeBlock = await prisma.timeBlock.create({
        data: {
            startTime: new Date(startTime),
            endTime: new Date(endTime)
        }
    });
    return newTimeBlock;
};
 
// Servicio para listar reservaciones
const listReservationService = async () => {
    // Si 'prisma' está undefined aquí, es porque la instancia de arriba falló o no es visible
    const reservations = await prisma.appointment.findMany({
        include: {
            user: true,
            timeBlock: true
        }
    });
    return reservations;
};

module.exports = { createTimeBlockService, listReservationService };