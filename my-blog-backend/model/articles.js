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
    }

});

// Create the Article model
const ArticleModel = mongoose.model('articlesData', articleSchema);

// Export the model
module.exports = ArticleModel;




// upvotes: {
//     type: Number,    
//     required: true
// },
// comments: [
//     {
//         postedBy: {
//             type: String
//         },
//         text: {
//             type: String
//         }
//     }
// ]