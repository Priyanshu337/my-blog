const fs = require('fs');
const admin = require('firebase-admin');
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');


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
        const article = await ArticleModel.findOne({ _id: articleIdParam });
        if (article) {
            res.json(article);
        } else {
            res.json("No article found")
        }
    } catch (err) {
        console.error("Error:", err);
        res.status(500).json({ error: "something is wrong with recieving data from db" });
    }
});


app.post('/api/articles/:articleId/upvotes', async (req, res) => {
    const { articleId } = req.params;
    try {
        await ArticleModel.findOneAndUpdate({ _id: articleId }, { $inc: { upvotes: 1 } }, { new: true });
        res.status("Success");
    } catch (error) {
        console.error(error);
        res.json({ error });
    }
});


// app.put('/api/articles/:articleId/upvotes', async (req, res) => {
//     const { articleId } = req.params;
//     console.log(articleId);

//     const upvote = await ArticleModel.findOne({ _id: articleId });
//     if (upvote) {
//         await ArticleModel.updateOne({ _id: articleId }, {
//             $inc: { upvotes: 1 }
//         });
//         res.json(article)
//     }
//     // const article = await ArticleModel.findOne({ _id: articleId });
//     else {
//         res.json(`There is no article ${articleId}`);
//     }
// })

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



// app.get('/signUp', async (req, res) => {
//     try {
//         const { username, password, verifyPassword } = req.body;
//         const newUser = new ArticleModel({
//             username: username,
//             password: password,
//             verifyPassword: verifyPassword
//         });
//         await newUser.save();
//         res.status(201).json({ message: 'User created successfully' });
//     } catch (error) {
//         console.error('Error saving User:', error.message);
//         res.status(500).json({ error: 'Internal Server Error' });
//     }
// });  '



