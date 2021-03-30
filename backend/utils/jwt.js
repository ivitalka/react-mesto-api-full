const jwt = require('jsonwebtoken');

const JWT_SECRET_KEY = 'very_secret';
const SALT_ROUNDS = 10;

const generateSign = (payload) => jwt.sign({ payload }, JWT_SECRET_KEY, { expiresIn: '7d' });

module.exports = { generateSign, JWT_SECRET_KEY, SALT_ROUNDS };
