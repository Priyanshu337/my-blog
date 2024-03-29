const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    query: {
        type: String,
        required: true
    }
});

const ContactFormModel = mongoose.model('contactFormData', contactSchema);

module.exports = ContactFormModel;
