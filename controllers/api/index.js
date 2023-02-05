const router = require('express').Router();

const commentRoutes = require('./comment-routes.js');
const postRoutes = require('./post-routes.js');
const userRoutes = require('./user-routes.js');

router.use('/comments', commentRoutes);
router.use('/posts', postRoutes);
router.use('/users', userRoutes);

module.exports = router;
