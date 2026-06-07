require('dotenv').config();

const { PrismaClient, Role } = require("@prisma/client");
const { encryptPassword } = require("./src/utils/encrypt-password");

const prisma = new PrismaClient();

async function main() {
  console.log("Iniciando carga de datos...");
  //CleanDB(optional but recommended for dev)
  await prisma.appointment.deleteMany();
  await prisma.timeBlock.deleteMany();
  await prisma.user.deleteMany();

  const usuarios = [
    {
      email: 'usuario1@medico.com',
      name: 'Usuario',
      lastName: 'Prueba',
      phone: '1234-5678',
      password: await encryptPassword('password123'),
      role: Role.USER,
    },
    {
      email: 'admin@medico.com',
      name: 'Administrador',
      lastName: 'Sistema',
      phone: '8888-9999',
      password: await encryptPassword('adminpassword'),
      role: Role.ADMIN,
    }
  ];
 
const usuariosCreados = [];

for (const u of usuarios) {
  const user = await prisma.user.upsert({
    where: { email: u.email },
    update: {},
    create: u,
  });

  console.log(`Usuario creado: ${user.email}`);
  usuariosCreados.push(user);
}

const timeBlock1 = await prisma.timeBlock.create({
  data: {
    startTime: new Date(2026, 0, 26, 9, 0),
    endTime: new Date(2026, 0, 26, 10, 0),
  },
});

const timeBlock2 = await prisma.timeBlock.create({
  data: {
    startTime: new Date(2026, 0, 26, 10, 0),
    endTime: new Date(2026, 0, 26, 11, 0),
  },
});

console.log("Bloques de tiempo creados"); 

await prisma.appointment.create({
  data: {
    date: new Date(),
    userId: usuariosCreados[0].id,
    timeBlockId: timeBlock1.id,
  },
});

await prisma.appointment.create({
  data: {
    date: new Date(),
    userId: usuariosCreados[1].id,
    timeBlockId: timeBlock2.id,
  },
});

console.log("Citas creadas");


console.log("Seed finalizado.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });