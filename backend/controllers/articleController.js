const ArticleModel = require('../models/ArticleModel');

const getAllArticles = async (req, res) => {
    try {
        const listArticle = await ArticleModel.find();
        if (listArticle.length > 0) {
            res.status(200).json(listArticle);
        } else {
            console.log("No article Found")
            res.json({ message: 'No Article List found' });
        }
    } catch (err) {
        console.log('Error:', err);
        res.status(500).json({ error: 'Something went wrong with receiving data from the database' });
    }
};


const getArticleById = async (req, res) => {
    try {
        const articleIdParam = req.params.articleId;
        const { uid } = req.user;
        const article = await ArticleModel.findOne({ _id: articleIdParam });

        if (article) {
            const upvoteIds = ArticleModel.upvoteIds || [];
            article.canUpvote = uid && !upvoteIds.includes(uid);
            res.json(article);
        } else {
            res.json("No article found")
        }
    } catch (err) {
        console.error("Error:", err);
        res.status(500).json({ error: "something is wrong with recieving data from db" });
    }
};

const addArticle = async (req, res) => {
    try {
        const { articleName, title, content, comments, upvotes } = req.body;
        const newArticle = new ArticleModel({
            name: articleName,
            title,
            content,
            comments,
            upvotes,
        });
        const savedArticle = await newArticle.save();
        res.status(201).json(savedArticle);
    } catch (error) {
        console.error('Error creating article:', error.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

module.exports = {
    getAllArticles,
    getArticleById,
    addArticle,
};
