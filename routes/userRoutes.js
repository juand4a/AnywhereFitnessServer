const express = require('express');
const router = express.Router();

const { getAllUsers,getUserById } = require('./../controllers/usercontroller')
router.get('/users', getAllUsers)
router.get('/:id', getUserById);

module.exports = router;