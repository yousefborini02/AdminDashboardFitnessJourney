const Subscription = require('../models/Subscription');

// Get all subscriptions
exports.getAllSubscriptions = async (req, res) => {
    try {
        const subscriptions = await Subscription.find().sort({ createdAt: -1 });
        res.status(200).json(subscriptions);
    } catch (error) {
        console.error('Error in getAllSubscriptions:', error);
        res.status(500).json({ 
            message: 'Error fetching subscriptions',
            error: error.message 
        });
    }
};

// Create new subscription
exports.createSubscription = async (req, res) => {
    try {
        const { name, totalVisits, durationInDays, price } = req.body;
        
        const newSubscription = new Subscription({
            name,
            totalVisits,
            durationInDays,
            price
        });

        await newSubscription.save();
        res.status(201).json(newSubscription);
    } catch (error) {
        console.error('Error in createSubscription:', error);
        res.status(500).json({ 
            message: 'Error creating subscription',
            error: error.message 
        });
    }
}; 