const GymAccount = require('../models/GymAccount');
const nodemailer = require('nodemailer');
// In gymAccountController.js
const bcrypt = require('bcryptjs');

// Get all gym accounts
exports.getAllGymAccounts = async (req, res) => {
    try {
        const accounts = await GymAccount.find()
            .select('-password')  // Exclude password from the response
            .sort({ createdAt: -1 });
        res.status(200).json(accounts);
    } catch (error) {
        console.error('Error fetching gym accounts:', error);
        res.status(500).json({ 
            message: 'Error fetching gym accounts',
            error: error.message 
        });
    }
};

// In gymAccountController.js
exports.getGymStats = async (req, res) => {
    try {
        const totalGymAccounts = await GymAccount.countDocuments();
        const activeGymAccounts = await GymAccount.countDocuments({ isApproved: true });
        const pendingGymAccounts = totalGymAccounts - activeGymAccounts;
        const inactiveRate = totalGymAccounts > 0 
            ? ((pendingGymAccounts / totalGymAccounts) * 100).toFixed(1) + "%" 
            : "0%";

        res.status(200).json({
            totalGymAccounts,
            activeGymAccounts,
            pendingGymAccounts,
            inactiveRate
        });
    } catch (error) {
        console.error('Error fetching gym stats:', error);
        res.status(500).json({ 
            message: 'Error fetching gym statistics',
            error: error.message 
        });
    }
};

// Update gym account approval status
exports.updateApprovalStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const { isApproved } = req.body;

        const account = await GymAccount.findByIdAndUpdate(
            id,
            { isApproved },
            { new: true }
        ).select('-password');

        if (!account) {
            return res.status(404).json({ message: 'Gym account not found' });
        }

        // Send email notification
        await sendStatusUpdateEmail(account.email, account.gymName, isApproved);

        res.status(200).json(account);
    } catch (error) {
        console.error('Error updating gym account status:', error);
        res.status(500).json({ 
            message: 'Error updating gym account status',
            error: error.message 
        });
    }
};



// Add gym account
exports.createGymAccount = async (req, res) => {
    try {
        const { gymName, email, password } = req.body;
        
        // Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        
        const newGymAccount = new GymAccount({
            gymName,
            email,
            password: hashedPassword,
            commercialRegister: 'pending', // Default value or handle file upload
        });

        const savedAccount = await newGymAccount.save();
        
        // Remove password from response
        const accountResponse = savedAccount.toObject();
        delete accountResponse.password;
        
        res.status(201).json(accountResponse);
    } catch (error) {
        console.error('Error creating gym account:', error);
        res.status(500).json({ 
            message: 'Error creating gym account',
            error: error.message 
        });
    }
};

// Helper function to send email
async function sendStatusUpdateEmail(email, gymName, isApproved) {
    try {
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS
            }
        });

        const status = isApproved ? 'approved' : 'deactivated';
        const mailOptions = {
            from: `"Admin Support" <${process.env.EMAIL_USER}>`,
            to: email,
            subject: `Gym Account Status Update - ${status.toUpperCase()}`,
            html: `
                <div style="font-family: Arial, sans-serif; padding: 20px;">
                    <h2>Account Status Update</h2>
                    <p>Dear ${gymName},</p>
                    <p>Your gym account has been ${status}.</p>
                    ${isApproved ? 
                        `<p>You can now access all features of your account.</p>` : 
                        `<p>Your account access has been temporarily suspended. Please contact support for more information.</p>`
                    }
                    <p>If you have any questions, please don't hesitate to contact us.</p>
                    <br/>
                    <p>Best regards,</p>
                    <p>Admin Support Team</p>
                </div>
            `
        };

        await transporter.sendMail(mailOptions);
        console.log(`Status update email sent to ${email}`);
    } catch (error) {
        console.error('Error sending status update email:', error);
        // Don't throw the error - we don't want to break the status update if email fails
    }
} 