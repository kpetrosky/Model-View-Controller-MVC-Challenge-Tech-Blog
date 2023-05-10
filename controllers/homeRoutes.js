const router = require('express').Router();
const { Blog, User } = require('../models');
//../models
//add blog instead of projects
const withAuth = require('../utils/auth');

router.get('/', async (req, res) => {
    try {

        const blogData = await Blog.findAll({
            include: [
                {
                    model: User,
                    attributes: ['name'],
                }
            ],
        });

        const blogs = blogData.map((blog) => blog.get({ plain: true }));


        res.render('homepage', {
            blogs,
            logged_in: req.session.logged_in
        });
    } catch (err) {
        res.status(500).json(err);
    }
});


// router.get('/project/:id', async (req, res) => {
//     try {
//         const projectData = await Project.findByPk(req.params.id, {
//             include: [
//                 {
//                     model: User,
//                     attributes: ['name'],
//                 }
//             ],
//         });

//         const project = projectData.get({ plain: true });

//         res.render('project', {
//             ...project,
//             logged_in: req.session.logged_in
//         });

//     } catch (err) {
//         res.status(500).json(err);
//     }
// });

// router.get('/profile', withAuth, async (req, res) => {
// try {
//     const userData = await User.findByPk(req.session.user_id,{
//         attributes: { exlude: ['password'] },
//         include: [{model: Project} ],
//     });
// const user = userData.get({ plain: true });

// res.render('profile', {
//     ...user,
//     logged_in: true
// });
// } catch(err)  {
//     res.status(500).json(err);
// }
// });

router.get('/login', (req, res) => {
    if (req.session.logged_in) {
        res.redirect('/profile');
        return;
    }

    res.render('login');
});

module.exports = router;





