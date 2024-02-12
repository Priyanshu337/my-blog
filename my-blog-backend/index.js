const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const ArticleModel = require('./model/Articles');
const cors = require('cors');

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
        const article = await ArticleModel.findOne({ name: articleIdParam });
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



app.put('/api/articles/:name/upvotes', async (req, res) => {
    const { name } = req.query.params;
    await ArticleModel.updateOne({ name: name }, {
        $inc: { upvotes: 1 }
    });
    const article = await ArticleModel.findOne({ name });
    if (article) {
        res.json(article)
    }
    else {
        res.json(`There is no article ${name}`);
    }
})

app.post('/api/articles/:name/comments', async (req, res) => {
    const { name } = req.params;
    const { postedBy, text } = req.body;
    await ArticleModel.updateOne({ name: name }, {
        $push: { comments: { postedBy, text } }
    })
    const article = await ArticleModel.findOne({ name: name });
    if (article) {
        res.json(article);
    } else {
        res.json('invalid article');
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
// });  