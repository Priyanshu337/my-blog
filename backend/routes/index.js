const express = require('express');
const router = express.Router();

const userController = require('../controllers/userController');
const articleController = require('../controllers/articleController');
const upvoteController = require('../controllers/upvoteController');
const commentController = require('../controllers/commentController');

// Middleware
router.use(userController.authenticateToken);

// Article routes
router.get('/api/articles', articleController.getAllArticles);
router.post('/api/articles/add', articleController.addArticle);

// Upvote route
router.post('/api/articles/:articleId/upvotes', upvoteController.upvoteArticle);

// Comment route
router.post('/api/articles/:articleId/comments', commentController.addComment);

// Export the router
module.exports = router;
