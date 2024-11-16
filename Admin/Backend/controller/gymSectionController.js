const GymSection = require('../models/GymSection');

// Get all gym sections
exports.getAllGymSections = async (req, res) => {
    try {
        const gymSections = await GymSection.find()
            .populate('gymId', 'gymName email')
            .sort({ createdAt: -1 });
        res.status(200).json(gymSections);
    } catch (error) {
        console.error('Error fetching gym sections:', error);
        res.status(500).json({ 
            message: 'Error fetching gym sections',
            error: error.message 
        });
    }
};

// Update approval status
exports.updateApprovalStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const { isApproved } = req.body;

        const gymSection = await GymSection.findByIdAndUpdate(
            id,
            { isApproved },
            { new: true }
        ).populate('gymId', 'gymName email');

        if (!gymSection) {
            return res.status(404).json({ message: 'Gym section not found' });
        }

        res.status(200).json(gymSection);
    } catch (error) {
        console.error('Error updating gym section status:', error);
        res.status(500).json({ 
            message: 'Error updating gym section status',
            error: error.message 
        });
    }
};

// Get gym section by ID
exports.getGymSectionById = async (req, res) => {
    try {
        const { id } = req.params;
        const gymSection = await GymSection.findById(id)
            .populate('gymId', 'gymName email');

        if (!gymSection) {
            return res.status(404).json({ message: 'Gym section not found' });
        }

        res.status(200).json(gymSection);
    } catch (error) {
        console.error('Error fetching gym section:', error);
        res.status(500).json({ 
            message: 'Error fetching gym section',
            error: error.message 
        });
    }
}; 