import express from "express";
import { connectToDb, db } from "./db.js";

const app = express();
app.use(express.json());


app.get('/api/articles/:name', async (req, res) => {
    try {
        const { name } = req.params;
        // use react blog db
        const article = await db.collection('articles').findOne({ name });
        res.json(article);

    } catch (err) {
        console.error("Error:", err);
        res.status(500).json({ error: "IDK what is wrong with this code" });
    }
});

// upVote for postman

app.put('/api/articles/:name/upvote', async (req, res) => {
    const { name } = req.params;

    await db.collection('articles').updateOne({ name }, {
        $inc: { upvotes: 1 },
    });
    const article = await db.collection('articles').findOne({ name });
    if (article) {
        res.json(article)
    }
    else {
        res.send(`There is no article ${name}`);
    }
})

// New comment route

app.post('/api/articles/:name/comments', async (req, res) => {
    const { name } = req.params;
    const { postedBy, text } = req.body;

    await db.collection('articles').updateOne({ name }, {
        $push: { comments: { postedBy, text } }
    })
    const article = await db.collection('articles').findOne({ name });

    if (article) {
        res.json(article);
    } else {
        res.send('invalid article');
    }
})


connectToDb(() => {
    console.log('Connected Succesfully to DB');
    app.listen(8000, () => {
        console.log('Server is Listeneing on Port 8000');
    });
})