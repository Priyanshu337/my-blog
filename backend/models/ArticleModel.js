const mongoose = require('mongoose');

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
        type: [String],
        required: true
    },
    upvotes: {
        type: Number,
        required: true
    },
    upVoteIds: {
        type: [String]
    }
});

const ArticleModel = mongoose.model('articlesDatas', articleSchema);

module.exports = ArticleModel;
