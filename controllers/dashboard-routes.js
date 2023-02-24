const router = require('express').Router();
const sequelize = require('../config/connection');

const { User, Post, Comment } = require('../models');

const withAuth = require('../utils/auth');

// get all users
router.get('/', withAuth, (req, res) => {
    Post.findAll({
        where: {
            // use ID from session
            user_id: req.session.user_id
        },
        attributes: [
            'id',
            'title',
            'created_at',
            'post_content'
        ],
        include: [
            {
                model: Comment,
                attributes: ['id', 'comment_text', 'post_id', 'user_id', 'created_at'],
                include: {
                    model: User,
                    attributes: ['username']
                }
            },
            {
                model: User,
                attributes: ['username']
            }
        ]
    })
        .then(dbPostData => {
            const posts = dbPostData.map(post => post.get({ plain: true }));
            res.render('dashboard', { posts, loggedIn: true });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});


//Edit a post by ID
router.get('/edit/:id', withAuth, (req, res) => {
    Post.findOne({
        where: {
            id: req.params.id
        },
        attributes: [
            'id',
            'post_content',
            'title',
            'created_at'
        ],
        include: [
            {
                model: Comment,
                attributes: ['id', 'comment_text', 'post_id', 'user_id', 'created_at'],
                include: {
                    model: User,
                    attributes: ['username']
                }
            },
            {
                model: User,
                attributes: ['username']
            }
        ]
    })

// If no post is found, return an error message
        .then(dbPostData => {
            if (!dbPostData) {
                res.status(404).json({ message: 'Sorry, no post found with this id' });
                return;
            }


// serialize the data/ send to template
            const post = dbPostData.get({ plain: true });
            res.render('edit-post', { post, loggedIn: true });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

// Create a new post
router.get('/new', (req, res) => {
    res.render('create-post', { loggedIn: true });
});

module.exports = router;



