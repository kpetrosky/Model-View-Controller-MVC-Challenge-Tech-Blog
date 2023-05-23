const router = require('express').Router();
const { Blog } = require('../../models');
const withAuth = require('../../utils/auth');

router.post('/', withAuth, async (req, res) => {
    try {
        const newBlog = await Blog.create({
            ...req.body,
            user_id: req.session.user_id,
        });
        console.log(newBlog);
        res.status(200).json(newBlog);
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

router.delete('/:id', withAuth, async (req, res) => {
    try {
        const newBlog = await Blog.destroy({
            where: {
                id: req.params.id,
            }
        });
        if (newBlog) {
            res.status(200).json({ message: 'NewBlog deleted successfully' });
        } else {
            res.status(404).json({ message: 'NewBlog not found' });
        }
    } catch (error) {
        res.status(500).json(error);
    }
});

module.exports = router;
