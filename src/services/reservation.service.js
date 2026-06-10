const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

class ReservationService {

    async create(data) {
        const conflict = await prisma.appointment.findFirst({
            where: {
                date: new Date(data.date),
                timeBlockId: data.timeBlockId
            }
        });

        if (conflict) {
            throw new Error('El horario ya está ocupado');
        }

        return await prisma.appointment.create({
            data: {
                userId: data.userId,
                timeBlockId: data.timeBlockId,
                date: new Date(data.date)
            }
        });
    }

    async get(id) {
        return await prisma.appointment.findUnique({
            where: {
                id: parseInt(id)
            },
            include: {
                user: {
                    select: {
                        id: true,
                        email: true,
                        name: true,
                        lastName: true,
                        phone: true,
                        role: true
                    }
                },
                timeBlock: true
            }
        });
    }

    async edit(id, data) {

        const reservation = await prisma.appointment.findUnique({
            where: {
                id: parseInt(id)
            }
        });

        if (!reservation) {
            throw new Error('La reserva no existe');
        }

        const conflict = await prisma.appointment.findFirst({
            where: {
                date: new Date(data.date),
                timeBlockId: data.timeBlockId,
                id: { not: parseInt(id) }
            }
        });

        if (conflict) {
            throw new Error('El horario solicitado ya está ocupado');
        }

        return await prisma.appointment.update({
            where: { id: parseInt(id) },
            data: {
                date: new Date(data.date),
                timeBlockId: data.timeBlockId
            }
        });
    }

    async delete(id) {

        const reservation = await prisma.appointment.findUnique({
            where: {
                id: parseInt(id)
            }
        });

        if (!reservation) {
            throw new Error('La reserva no existe');
        }

        return await prisma.appointment.delete({
            where: { id: parseInt(id) }
        });
    }

    async getAll() {
        return await prisma.appointment.findMany({
            include: {
                user: {
                    select: {
                        id: true,
                        email: true,
                        name: true,
                        lastName: true,
                        phone: true,
                        role: true
                    }
                },
                timeBlock: true
            }
        });
    }

    async getByUser(userId) {
        return await prisma.appointment.findMany({
            where: {
                userId: parseInt(userId)
            },
            include: {
                user: {
                    select: {
                        id: true,
                        email: true,
                        name: true,
                        lastName: true,
                        phone: true,
                        role: true
                    }
                },
                timeBlock: true
            }
        });
    }
}

module.exports = new ReservationService();