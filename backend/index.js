const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const fs = require('fs');
const admin = require('firebase-admin');

const routes = require('./routes/index');

const app = express();
const port = 8080;

app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

mongoose.connect('mongodb+srv://priyanshu:priyanshu@cluster0.wrio9jz.mongodb.net/My-blog')
    .then(() => console.log('Connected to DB!'));

app.use(routes);

app.listen(port, () => {
    console.log('Server is Listening on Port', port);
});

// Firebase authentication middleware...
// Other middleware...