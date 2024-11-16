const User = require('../models/User');

// Get all users
exports.getAllUsers = async (req, res) => {
    try {
        console.log('Fetching all users...');
        const users = await User.find()
            .select('-password -__v')
            .lean();
        
        console.log(`Found ${users.length} users`);
        res.status(200).json(users);
    } catch (error) {
        console.error('Error in getAllUsers:', error);
        res.status(500).json({ 
            message: 'Error fetching users',
            error: error.message 
        });
    }
};

exports.getUserStats = async (req, res) => {
    try {
        const totalUsers = await User.countDocuments();
        const activeUsers = await User.countDocuments({ isActive: true });
        const inactiveUsers = totalUsers - activeUsers;
        const inactiveRate = totalUsers > 0 
            ? ((inactiveUsers / totalUsers) * 100).toFixed(1) + "%" 
            : "0%";

        res.status(200).json({
            totalUsers,
            activeUsers,
            inactiveUsers,
            inactiveRate
        });
    } catch (error) {
        console.error('Error fetching user stats:', error);
        res.status(500).json({ 
            message: 'Error fetching user statistics',
            error: error.message 
        });
    }
};
// Update user status
exports.updateUserStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const { isActive } = req.body;
        
        console.log(`Updating user ${id} status to ${isActive}`);
        
        const user = await User.findByIdAndUpdate(
            id,
            { isActive },
            { new: true, select: '-password -__v' }
        );

        if (!user) {
            console.log(`User ${id} not found`);
            return res.status(404).json({ message: 'User not found' });
        }

        console.log(`User ${id} status updated successfully`);
        res.status(200).json(user);
    } catch (error) {
        console.error('Error in updateUserStatus:', error);
        res.status(500).json({ 
            message: 'Error updating user status',
            error: error.message 
        });
    }
}; 