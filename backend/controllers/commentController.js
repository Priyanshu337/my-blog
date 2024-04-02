const ArticleModel = require('../models/ArticleModel');

const addComment = async (req, res) => {
    try {
        const { articleId } = req.params;
        console.log("This is the article ID ..", articleId);
        const { commentData } = req.body;
        // const { commentData } = req.body;
        console.log("This is comment data that i recieve on backend", commentData);
        const response = await ArticleModel.findByIdAndUpdate(articleId, {
            $push: { comments: commentData },
        });

        const article = await ArticleModel.findById(articleId);
        if (article) {
            res.json(article);
        } else {
            res.json('Invalid Article');
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    addComment
};
