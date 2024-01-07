const mongoose = require('mongoose');

// Define the article schema
const articleSchema = new mongoose.Schema({
    _id: {
        type: mongoose.Schema.Types.ObjectId,
        default: mongoose.Types.ObjectId
    },
    name: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    }, upvotes: {
        type: Number,
        default: 0
    },
    comments: [
        {
            postedBy: {
                type: String,
                required: true
            },
            text: {
                type: String,
                required: true
            }
        }
    ]
});

// Create the Article model
const ArticleModel = mongoose.model('article', articleSchema);

// Export the model
module.exports = ArticleModel;
