const express = require('express');
const userController = require('../controller/userController');
const protect = require('../middleware/authMiddleware');
const { route } = require('./reservationRoutes');

const router = express.Router();
router.post('/register', userController.createUser);  // Register user
router.post('/login', userController.loginUser);  // Login user
// router.get('/', protect, userController.getAllUsers);  // Get all users (admin only)
router.put('/:id', protect, userController.updateUser);
router.delete('/:id', protect, userController.deleteUser);  // Delete user (admin only)
router.get('/',protect, userController.getAllUsers);
router.get('/:id',userController.getuser);
// Export the router
module.exports = router;
