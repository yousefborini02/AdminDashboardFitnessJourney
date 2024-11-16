const express = require('express');
const subscriptionController = require('../controller/subscriptionController');
const router = express.Router();

// Get all subscriptions
router.get('/', subscriptionController.getAllSubscriptions);

// Create new subscription
router.post('/', subscriptionController.createSubscription);

module.exports = router; 