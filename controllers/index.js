
const router = require('express').Router();
const apiRoutes = require('./api');
const homeRoutes = require('./home-routes');
const dashboardRoutes = require('./dashboard-routes');


router.use('/', homeRoutes);
router.use('/api', apiRoutes);
router.use('/dashboard', dashboardRoutes);

// If a request doesn't exist, the user will see an error message
// router.use((req, res) => {
//     res.status(404).end();
// });

module.exports = router;
