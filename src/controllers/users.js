const fs = require('fs');
const path = require('path');
const { validateUser, isUniqueId } = require('../utils/validation');

// Ruta del archivo donde se almacenan los usuarios
const usersFilepath = path.join(__dirname, '../../users.json');
console.log('Ruta users.json:', usersFilepath);
// Obtener todos los usuarios
const getUsers = (req, res) => {

    fs.readFile(usersFilepath, 'utf-8', (error, data) => {

        if (error) {
            console.error(error);
            return res.status(500).json({
                error: "Error con la conexion de datos"
            });
        }

        const users = JSON.parse(data);
        res.json(users);
    });
};

// Obtener usuario por ID
const getUserById = (req, res) => {

    const userId = parseInt(req.params.id);

    fs.readFile(usersFilepath, 'utf-8', (error, data) => {

        if (error) {
            return res.status(500).send("Error de lectura");
        }

        const users = JSON.parse(data);
        const user = users.find(u => u.id === userId);

        if (user) {
            res.json(user);
        } else {
            res.status(404).send("Usuario no encontrado");
        }
    });
};

// API para guardar usuario
const createUser = (req, res) => {

    const newUsers = req.body;

    fs.readFile(usersFilepath, 'utf-8', (error, data) => {

        if (error) {
            return res.status(500).json({
                error: "Error leyendo datos"
            });
        }

        const users = JSON.parse(data);

        // VALIDACIONES
        const validation = validateUser(newUsers, users);

        // Validar datos
        if (!validation.isValid) {

            return res.status(400).json({
                error: validation.errors
            });
        }

        // Validar ID repetido
        if (isUniqueId(newUsers.id, users)) {

            return res.status(400).json({
                error: "Ese ID ya existe"
            });
        }

        // Agregar usuario
        users.push(newUsers);

        fs.writeFile(usersFilepath, JSON.stringify(users, null, 2), (error) => {

            if (error) {
                return res.status(500).json({
                    error: "Error al guardando usuario"
                });
            }

            res.status(201).json(newUsers);
        });
    });
};

// Para modificar un usuario
const updateUser = (req, res) => {

    const userId = parseInt(req.params.id);
    const updatedUserData = req.body;

    console.log("ID de URL:", userId, "(tipo:", typeof userId, ")");
    console.log("ID del Body:", updatedUserData.id, "(tipo:", typeof updatedUserData.id, ")");

    if (!updatedUserData || Object.keys(updatedUserData).length === 0) {
        return res.status(400).json({ error: "El cuerpo de la petición no puede estar vacío" });
    }

    fs.readFile(usersFilepath, 'utf-8', (error, data) => {

        if (error) {
            return res.status(500).json({
                error: "Error con conexion de datos"
            });
        }

        let users = JSON.parse(data);

        const validation = validateUser(updatedUserData, users);

        if (!validation.isValid) {
            return res.status(400).json({
                error: validation.errors
            });
        }

        if (updatedUserData.id !== userId) {
            return res.status(400).json({
                error: "La ID de la URL y del body deben coincidir"
            });
        }

        users = users.map(user =>
            user.id === userId
                ? { ...user, ...updatedUserData }
                : user
        );

        fs.writeFile(usersFilepath, JSON.stringify(users, null, 2), (err) => {

            if (err) {
                return res.status(500).json({
                    error: "Error al actualizar el usuario"
                });
            }

            res.json(updatedUserData);
        });
    });
};

// Para eliminar un usuario
const deleteUser = (req, res) => {
    const userId = parseInt(req.params.id, 10);
    
    fs.readFile(usersFilepath, 'utf-8', (err, data) => {
        if (err) {
            return res.status(500).json({
                error: "Error con conexion de datos"
            });
        }

        let users = JSON.parse(data);
        users = users.filter(user => user.id !== userId);
        
        fs.writeFile(usersFilepath, JSON.stringify(users, null, 2), (err) => {
            if (err) {
                return res.status(500).json({
                    error: "Error al eliminar usuario"
                });
            }

            // respuesta en el Postman
            res.status(200).json({
                message: "Usuario eliminado correctamente",
                idEliminado: userId
            });
        });
    });
};

// Exportar funciones del controlador
module.exports = {
    getUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser
};
