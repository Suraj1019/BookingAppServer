const express = require('express');
const router = express.Router();
const { register } = require('./userController');

router.post('/register', register);

module.exports = router;