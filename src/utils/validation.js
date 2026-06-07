// Validación de correo electrónico mediante Regex
function isValidEmail(email) {

    // Expresión regular para validar email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Validación de nombre (mínimo 3 caracteres)
function isValidName(name) {
    return typeof name === 'string' && name.length >= 3;
}

// Validación de ID unico
function isUniqueId(id, users) {
    const isUnique = users.some(user => user.id === id);
    return isUnique;
}

// Validación de ID numérico
function isValidId(id) {
    return typeof id === 'number';
}

// Función principal de validación
function validateUser(user, users) {
    const errors = [];

    // Validar nombre
    if (!isValidName(user.name)) {
        errors.push("El nombre debe tener al menos tres caracteres");
    }

    // Validar correo
    if (!isValidEmail(user.email)) {
        errors.push("ElCorreo electrónico no es valido");
    }

    // Validar ID
    if (!isValidId(user.id, users)) {
        errors.push("El ID debe ser numérico y unico");
    }

    return {
        isValid: errors.length === 0,
        errors: errors
    };
}

// Exportar funciones
module.exports = {

    validateUser,
    isUniqueId
};