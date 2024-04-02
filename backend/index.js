const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const fs = require('fs');
const admin = require('firebase-admin');
const { initializeApp } = require("firebase-admin/app");
const routes = require('./routes/index');


const firebaseConfig = {
    apiKey: "AIzaSyCevciw-NbbVMr1LFRk3_3ndDZB3wBu0OM",
    authDomain: "my-blog-page-a7c48.firebaseapp.com",
    projectId: "my-blog-page-a7c48",
    storageBucket: "my-blog-page-a7c48.appspot.com",
    messagingSenderId: "1048419254864",
    appId: "1:1048419254864:web:f7de5d47216e7d22e48755",
    measurementId: "G-YPW3XD8Y7K"
};

const firebase = initializeApp(firebaseConfig);



const app = express();

app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const port = 8080;
app.listen(port, () => {
    console.log('Server is Listening on Port', port);
});
mongoose.connect('mongodb+srv://priyanshu:priyanshu@cluster0.wrio9jz.mongodb.net/My-blog')
    .then(() => console.log('Connected to DB!'));

app.use(routes);


// Firebase authentication middleware...
// Other middleware...