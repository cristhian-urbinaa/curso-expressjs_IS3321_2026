const bcrypt = require("bcryptjs");
const SALT_ROUNDS = 10;

async function encryptPassword(plainPassword) {
  return await bcrypt.hash(plainPassword, SALT_ROUNDS);
}

module.exports = { encryptPassword };