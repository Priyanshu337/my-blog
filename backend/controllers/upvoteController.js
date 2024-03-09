const ArticleModel = require('../models/ArticleModel');

const upvoteArticle = async (req, res) => {
    try {
        const { articleId } = req.params;
        const { uid } = req.user;

        const article = await ArticleModel.findById(articleId);
        if (article) {
            const upvoteIds = article.upVoteIds || [];
            const canUpvote = uid && !upvoteIds.includes(uid);

            if (canUpvote) {
                await ArticleModel.findByIdAndUpdate(articleId, {
                    $inc: { upvotes: 1 },
                    $push: { upVoteIds: uid },
                });
            }

            const updatedArticle = await ArticleModel.findById(articleId);
            res.json(updatedArticle);
        } else {
            res.json('Invalid Article');
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    upvoteArticle,
};
