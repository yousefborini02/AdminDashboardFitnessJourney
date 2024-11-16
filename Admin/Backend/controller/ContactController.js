const ContactMessage = require('../models/ContactUs');
const nodemailer = require('nodemailer');

// Get all contact messages
exports.getAllMessages = async (req, res) => {
    try {
        console.log('Fetching all contact messages...');
        const messages = await ContactMessage.find()
            .sort({ createdAt: -1 })
            .populate('userId', 'name email')
            .lean();
        
        console.log(`Found ${messages.length} messages`);
        res.status(200).json(messages);
    } catch (error) {
        console.error('Error in getAllMessages:', error);
        res.status(500).json({ 
            message: 'Error fetching contact messages',
            error: error.message 
        });
    }
};

// Delete a contact message
exports.deleteMessage = async (req, res) => {
    try {
        const { id } = req.params;
        console.log(`Attempting to delete message with ID: ${id}`);
        
        const message = await ContactMessage.findByIdAndDelete(id);
        
        if (!message) {
            console.log(`Message with ID ${id} not found`);
            return res.status(404).json({ message: 'Message not found' });
        }
        
        console.log(`Successfully deleted message with ID: ${id}`);
        res.status(200).json({ message: 'Message deleted successfully' });
    } catch (error) {
        console.error('Error in deleteMessage:', error);
        res.status(500).json({ 
            message: 'Error deleting message',
            error: error.message 
        });
    }
};

// Update message status
exports.updateMessageStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body;
        
        console.log(`Updating message ${id} status to ${status}`);
        
        const message = await ContactMessage.findByIdAndUpdate(
            id,
            { status, updatedAt: Date.now() },
            { new: true }
        );

        if (!message) {
            console.log(`Message ${id} not found`);
            return res.status(404).json({ message: 'Message not found' });
        }

        console.log(`Message ${id} status updated successfully`);
        res.status(200).json(message);
    } catch (error) {
        console.error('Error in updateMessageStatus:', error);
        res.status(500).json({ 
            message: 'Error updating message status',
            error: error.message 
        });
    }
};

// Create new contact message
exports.createMessage = async (req, res) => {
    try {
        const { name, email, message } = req.body;
        
        console.log('Creating new contact message');
        
        const newMessage = new ContactMessage({
            name,
            email,
            message,
            status: 'new'
        });

        await newMessage.save();
        
        console.log('Contact message created successfully');
        res.status(201).json(newMessage);
    } catch (error) {
        console.error('Error in createMessage:', error);
        res.status(500).json({ 
            message: 'Error creating contact message',
            error: error.message 
        });
    }
};

// Send reply email
exports.sendEmail = async (req, res) => {
    try {
        const { email, subject, message } = req.body;
        console.log('Attempting to send email to:', email);

        // Validate email configuration
        if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
            console.error('Email configuration missing');
            return res.status(500).json({ 
                message: 'Email configuration missing',
                error: 'EMAIL_CONFIG_MISSING'
            });
        }

        // Create transporter with more detailed configuration
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            host: 'smtp.gmail.com',
            port: 587,
            secure: false, // true for 465, false for other ports
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS
            },
            debug: true // Enable debug logs
        });

        // Verify transporter configuration
        try {
            await transporter.verify();
            console.log('Transporter verified successfully');
        } catch (verifyError) {
            console.error('Transporter verification failed:', verifyError);
            return res.status(500).json({ 
                message: 'Email service configuration error',
                error: verifyError.message 
            });
        }

        // Email options
        const mailOptions = {
            from: `"Admin Support" <${process.env.EMAIL_USER}>`,
            to: email,
            subject: `Re: ${subject}`,
            text: message,
            html: `<div style="font-family: Arial, sans-serif;">
                    <h2>Response to your inquiry</h2>
                    <p>${message}</p>
                    <br/>
                    <p>Best regards,</p>
                    <p>Admin Support Team</p>
                   </div>`
        };

        // Send email
        const info = await transporter.sendMail(mailOptions);
        console.log('Email sent successfully:', info.messageId);

        res.status(200).json({ 
            message: 'Email sent successfully',
            messageId: info.messageId 
        });
    } catch (error) {
        console.error('Error in sendEmail:', error);
        res.status(500).json({ 
            message: 'Error sending email',
            error: error.message,
            details: error.stack
        });
    }
}; 