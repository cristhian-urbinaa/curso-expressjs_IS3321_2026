const {
  registerService,
  loginService
} = require('../services/authService');

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// LOGICA DE DB-USERS
const getAllUsers = async (req, res) => {
  try {
    const users = await prisma.user.findMany({
      select: {
        id: true,
        email: true,
        name: true,
        lastName: true,
        phone: true,
        role: true
      }
    });

    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: 'Error obteniendo usuarios' });
  }
};

// REGISTER
const register = async (req, res) => {
  try {
    const {
      email,
      password,
      name,
      lastName,
      phone
    } = req.body;

    await registerService(
      email,
      password,
      name,
      lastName,
      phone
    );

    res.status(201).json({
      message: 'user registered successfully'
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      error: 'Error registrando usuario'
    });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const token = await loginService(email, password);

    res.status(200).json({
      message: 'Login exitoso',
      token
    });

  } catch (error) {
    res.status(401).json({
      error: 'Credenciales inválidas'
    });
  }
};

module.exports = {
  getAllUsers,
  register,
  login
};