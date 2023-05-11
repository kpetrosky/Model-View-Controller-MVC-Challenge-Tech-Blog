const router = require('express').Router();
const { Blog } = require('../../models');
const withAuth = require('../../utils/auth');

router.post('/', withAuth, async (req, res) => {
    try {
        const NewBlog = await NewBlog.create({
            ...req.body,
            user_id: req.session.user_id,
        });
        res.status(200).json(newProject);
    } catch (err) {
        res.status(400).json(err);
    }
});

router.delete('/:id', withAuth, async (req, res) => {
    try {
        const NewBlog = await NewBlog.destroy({
            where: {
                id: req.params.id,
                user_id: req.session.user_id,
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
