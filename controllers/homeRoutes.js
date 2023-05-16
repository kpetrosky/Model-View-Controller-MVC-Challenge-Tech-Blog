const router = require('express').Router();
const { Blog, User } = require('../models');
const withAuth = require('../utils/auth');


router.get('/', async (req, res) => {
    console.log('homeroute triggered');
    try {
        const blogData = await Blog.findAll({
            include: [
                {
                    model: User,
                    attributes: ['username'],
                }
            ],
        });

        const blogs = blogData.map((blog) => blog.get({ plain: true }));

        console.log('blogs:', blogs); // Add a console log to check the value of blogs

        res.render('homepage', {
            blogs,
            logged_in: req.session.logged_in,
            pageTitle:"Adventures"
        });
    } catch (err) {
        console.log('Error:', err); // Add a console log to display the error
        res.status(500).json(err);
    }
});

router.get('/blog/:id', async (req, res) => {
    try {
        const blogData = await Blog.findByPk(req.params.id, {
            include: [
                {
                    model: User,
                    attributes: ['username'],
                }
            ],
        });

        const blog = blogData.get({ plain: true });

        console.log('blog:', blog); // Add a console log to check the value of blog

        res.render('blog', {
            ...blog,
            logged_in: req.session.logged_in
        });

    } catch (err) {
        console.log('Error:', err); // Add a console log to display the error
        res.status(500).json(err);
    }
});

router.get('/profile', withAuth, async (req, res) => {
    try {
        const userData = await User.findByPk(req.session.user_id, {
            attributes: { exclude: ['password'] },
            include: [{ model: Blog }],
        });

        const user = userData.get({ plain: true });

        console.log('user:', user); // Add a console log to check the value of user

        res.render('profile', {
            ...user,
            logged_in: true
        });
    } catch (err) {
        console.log('Error:', err); // Add a console log to display the error
        res.status(500).json(err);
    }
});

router.get('/login', (req, res) => {
    if (req.session.logged_in) {
        res.redirect('/profile');
        return;
    }

    res.render('login');
});

module.exports = router;
