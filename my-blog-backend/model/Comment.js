const mongoose = require('mongoose');

// Define the article schema
const commentSchema = new mongoose.Schema({
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

// Create the Comment model
const CommentModel = mongoose.model('CommentsData', commentSchema);

// Export the model
module.exports = CommentModel;

