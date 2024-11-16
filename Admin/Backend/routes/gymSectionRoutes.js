const express = require('express');
const gymSectionController = require('../controller/gymSectionController');
const router = express.Router();

// Get all gym sections
router.get('/', gymSectionController.getAllGymSections);

// Get gym section by ID
router.get('/:id', gymSectionController.getGymSectionById);

// Update gym section approval status
router.patch('/:id/approval', gymSectionController.updateApprovalStatus);

module.exports = router; 