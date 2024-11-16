const express = require('express');
const userController = require('../controller/userController');
const router = express.Router();

// Logging middleware
router.use((req, res, next) => {
    console.log('User route handler:', req.method, req.url);
    next();
});

// Get all users
router.get('/', (req, res, next) => {
    console.log('Accessing getAllUsers route');
    userController.getAllUsers(req, res, next);
});

router.get('/stats', userController.getUserStats);

// Update user status
router.patch('/:id', (req, res, next) => {
    console.log('Accessing updateUserStatus route');
    userController.updateUserStatus(req, res, next);
});

module.exports = router; 