const express = require('express');
const router = express.Router();

const userController = require('../controllers/userController');
const articleController = require('../controllers/articleController');
const upvoteController = require('../controllers/upvoteController');
const commentController = require('../controllers/commentController');
const contactFormController = require('../controllers/contactFormController');
// Middleware
router.use(userController.authenticateToken);

// Article routes
router.get('/api/articles', articleController.getAllArticles);
router.get('/api/articles/:articleId', articleController.getArticleById);
router.post('/api/articles/add', articleController.addArticle);

// Upvote route
router.post('/api/articles/:articleId/upvotes', upvoteController.upvoteArticle);

// Comment route
router.post('/api/articles/:articleId/comments', commentController.addComment);

// Contact form data route
router.post('/api/contact/contactform', contactFormController.contactFormController);

// Export the router
module.exports = router;
