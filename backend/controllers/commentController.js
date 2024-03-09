const ArticleModel = require('../models/ArticleModel');

const addComment = async (req, res) => {
    try {
        const { articleId } = req.params;
        const { comment } = req.body;

        const response = await ArticleModel.findByIdAndUpdate(articleId, {
            $push: { comments: comment },
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
