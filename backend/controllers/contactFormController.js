const ContactFormModel = require('../models/contactFormModel');

const contactFormController = async (req, res) => {
    try {
        const { email, query } = req.body; // Assuming you have reason and message in the request body

        const contact = new ContactFormModel({
            email: email,
            query: query,
        });
        await contact.save();

        console.log("Contact Form saved successfully");
        res.status(200).json({ message: 'Contact form submitted successfully' });
    } catch (err) {
        console.error("This is the consoled error", err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

module.exports = {
    contactFormController,
};
