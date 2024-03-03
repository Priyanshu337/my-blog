// these are all external imports
const fs = require('fs');
const admin = require('firebase-admin');
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

// These are all internal imports
const ArticleModel = require('./model/Articles');
const credentials = JSON.parse(
    fs.readFileSync('./credentials.json')
);
admin.initializeApp({
    credentials: admin.credential.cert(credentials),
})

const app = express();
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
const port = 8080;

mongoose.connect('mongodb+srv://priyanshu:priyanshu@cluster0.wrio9jz.mongodb.net/My-blog')
    .then(() => console.log('Connected to DB!'));

app.listen(port, () => {
    console.log('Server is Listeneing on Port', port);
});

app.use(async (req, res, next) => {
    const { authToken } = req.headers;
    if (authToken) {
        try {
            req.user = await admin.auth().verifyIdToken(authToken)

        } catch (e) {
            res.sendStatus(400);
            console.log(e);
        }
    }
    next();
});

app.get('/api/articles', async (req, res) => {
    try {
        const listArticle = await ArticleModel.find();
        if (listArticle) {
            res.status(200).json(listArticle);
        } else {
            res.json({ message: "No Article List found" });
        }
    } catch (err) {
        console.log('error:', err);
        res.status(500).json({ error: "something is wrong with recieving data from db" });
    }
})


app.post('/api/articles/add', async (req, res) => {
    try {
        const { articleName, title, content, comments, upvotes } = req.body;
        const newArticle = new ArticleModel({
            name: articleName,
            title: title,
            content: content,
            comments: comments,
            upvotes: upvotes,

        });
        const savedArticle = await newArticle.save();
        res.status(201, { message: 'Article Saved Succesfully' }).json(savedArticle);
    } catch (error) {
        console.error('Error creating article:', error.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.get('/api/articles/:articleid', async (req, res) => {
    try {
        const articleIdParam = req.params.articleid;
        const { uid } = req.user;

        const article = await ArticleModel.findOne({ _id: articleIdParam });
        if (article) {
            const upvoteIds = article.upvoteIds || [];
            article.canUpvote = uid && !upvoteIds.include(uid);
            res.json(article);
        } else {
            res.json("No article found")
        }
    } catch (err) {
        console.error("Error:", err);
        res.status(500).json({ error: "something is wrong with recieving data from db" });
    }
});

app.get('/api/articles/search', async (req, res) => {
    try {
        const { name } = req.body; // Access the name property from the request body
        console.log(name);
        res.json({ response: name }); // Send the response as JSON
    } catch (err) {
        console.log("Err", err);
        res.status(500).json({ error: 'Internal Server Error' }); // Send an error response
    }
});



app.post('/api/articles/:articleId/upvotes', async (req, res) => {

    const { articleId } = req.params;
    console.log(articleId);
    try {
        const response = await ArticleModel.findOneAndUpdate({ _id: articleId }, { $inc: { upvotes: 1 } }, { new: true });
        const updatedArticle = await ArticleModel.findById({ _id: articleId });
        if (updatedArticle) {
            res.json(updatedArticle);
        } else {
            res.json('invalid Article');
        }

    } catch (error) {
        console.error(error);
        res.json({ error });
    }
});

app.post('/api/articles/:articleId/comments', async (req, res) => {
    try {
        const { articleId } = req.params;
        const commentData = req.body;

        console.log("This is backend comment data: ", commentData);
        const response = await ArticleModel.updateOne({ _id: articleId }, {
            $push: { comments: commentData.commentData.comment }
        })
        console.log("response", response);
        const article = await ArticleModel.findOne({ _id: articleId });
        if (article) {
            res.json(article);
        } else {
            res.json('invalid article');
        }
    } catch (err) {
        console.log(err);
    }
})

