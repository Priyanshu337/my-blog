const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');


const app = express();
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

let articleInfo = [
    {
        name: 'learn-react',
        upvotes: 0,
        comments: [],
    }, {
        name: 'learn-node',
        upvotes: 0,
        comments: [],
    }, {
        name: 'mongodb',
        upvotes: 0,
        comments: [],
    }
]

// to save data in mongoose 
app.post('/api/articles/add', async (req, res) => {
    try {
        const { name, title, content } = req.body;

        // Create a new article instance
        const newArticle = new Article({
            name: name,
            title: title,
            content: content
        });

        // Save the article to the database
        await newArticle.save();

        res.status(201).json({ message: 'Article created successfully' });
    } catch (error) {
        console.error('Error creating article:', error.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});






app.get('/api/articles/{articleId}', async (req, res) => {
    try {
        // use react blog db
        const name = req.query.name;
        console.log(name);
        const article = await ArticleModel.findOne({ name: name });
        res.json(article);

    } catch (err) {
        console.error("Error:", err);
        res.status(500).json({ error: "what is wrong with this code" });
    }
});

// upvote for postman
app.put('/api/articles/:name/upvote', async (req, res) => {
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

const port = 8000;

mongoose.connect('mongodb+srv://priyanshu:priyanshu@cluster0.wrio9jz.mongodb.net/myblog')
    .then(() => console.log('Connected to DB!'));

app.listen(port, () => {
    console.log('Server is Listeneing on Port', port);
});

