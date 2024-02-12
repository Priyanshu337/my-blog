const mongoose = require('mongoose');

// Define the article schema
const articleSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    content: {
        type: [String],
        required: true
    },
    comments: {
        type: String,
        required: true
    },
    upvotes: {
        type: Number,
        required: true
    }
});

// Create the Article model
const ArticleModel = mongoose.model('articlesDatas', articleSchema);

// Export the model
module.exports = ArticleModel;

