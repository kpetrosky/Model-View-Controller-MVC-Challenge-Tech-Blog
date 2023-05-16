const router = require('express').Router();
const userRoutes = require('./userRoutes');
const blogRoutes = require('./blogRoutes');
// const appleRoutes = require('./applesRoutes');

router.use('/users', userRoutes);
router.use('/blog', blogRoutes);
// router.use('/apples', appleRoutes);

module.exports = router;
