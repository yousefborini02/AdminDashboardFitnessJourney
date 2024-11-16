const express = require('express');
const contactController = require('../controller/contactController');
const router = express.Router();

// Logging middleware for contact routes
router.use((req, res, next) => {
    console.log('Contact route accessed:', req.method, req.url);
    next();
});

// Get all messages
router.get('/contact-messages', contactController.getAllMessages);

// Create new message
router.post('/contact-messages', contactController.createMessage);

// Delete message
router.delete('/contact-messages/:id', contactController.deleteMessage);

// Update message status
router.patch('/contact-messages/:id/status', contactController.updateMessageStatus);

// Send reply email
router.post('/send-email', contactController.sendEmail);

module.exports = router; 