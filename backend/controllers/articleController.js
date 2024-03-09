const ArticleModel = require('../models/ArticleModel');

const getAllArticles = async (req, res) => {
    try {
        const listArticle = await ArticleModel.find();
        if (listArticle) {
            res.status(200).json(listArticle);
        } else {
            res.json({ message: 'No Article List found' });
        }
    } catch (err) {
        console.log('Error:', err);
        res.status(500).json({ error: 'Something went wrong with receiving data from the database' });
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
    addArticle,
};
