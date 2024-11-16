const express = require('express');
const gymAccountController = require('../controller/gymAccountController');
const router = express.Router();

// Get all gym accounts
router.get('/', gymAccountController.getAllGymAccounts);

// Update gym account approval status
router.patch('/:id/approval', gymAccountController.updateApprovalStatus);

router.get('/stats', gymAccountController.getGymStats);

router.post('/', gymAccountController.createGymAccount);

module.exports = router; 