const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');
const JWT = require('jsonwebtoken');
const prisma = new PrismaClient();

const registerService = async (
  email,
  password,
  name,
  lastName,
  phone
) => {

  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = await prisma.user.create({
    data: {
      email,
      password: hashedPassword,
      name,
      role: 'USER',
      lastName,
      phone
    }
  });

  return newUser;
};

const loginService = async (email, password) => {

  const user = await prisma.user.findUnique({
  where: {
    email: email.trim().toLowerCase()
  }
});

  if (!user) {
    throw new Error('USER_NOT_FOUND');
  }

  const validPassword = await bcrypt.compare(
    password,
    user.password
  );

  if (!validPassword) {
    throw new Error('INVALID_PASSWORD');
  }

  const token = JWT.sign(
    {
      id: user.id,
      role: user.role
    },
    process.env.JWT_SECRET,
    {
      expiresIn: '1h'
    }
  );

  return token;
};

module.exports = {
  registerService,
  loginService
};