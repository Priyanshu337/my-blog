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
        const { name, title, content } = req.body;
        // , upvotes, comments

        // Create a new article instance
        const newArticle = new ArticleModel({
            name,
            title,
            content
            // upvotes: upvotes,
            // comments: comments
        });

        // Save the article to the database
        const savedArticle = await newArticle.save();
        res.json(savedArticle);
        res.status(201).json({ message: 'Article created successfully' });
    } catch (error) {
        console.error('Error creating article:', error.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});


app.get('/api/articles/:articleId', async (req, res) => {
    try {
        // use react blog db
        const articleId = req.params.articleId;
        const name = req.query.name;
        console.log(name);
        const article = await ArticleModel.findById(articleId);
        console.log(articleId);
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
            res.json(listArticle);
        } else {
            res.json({ message: "No Article List found" });
        }
    } catch (err) {
        console.log('error:', err);
        res.status(500).json({ error: "something is wrong with recieving data from db" });
    }
})


app.get('/signUp', async (req, res) => {
    try {
        const { username, password, verifyPassword } = req.body;

        // Create a new article instance
        const newUser = new ArticleModel({
            username: username,
            password: password,
            verifyPassword: verifyPassword
        });

        // Save the article to the database
        await newUser.save();

        res.status(201).json({ message: 'User created successfully' });
    } catch (error) {
        console.error('Error saving User:', error.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});


// upvote for postman
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

// New comment route
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

