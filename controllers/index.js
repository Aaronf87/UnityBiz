const router = require('express').Router();

const homeRoutes = require('./homeRoutes')
const apiRoutes = require('./api');

// Send all the requests that begin with `/` to homeRoutes.js.
router.use('/', homeRoutes);

// Send all the requests that begin with /api to the index.js in the api folder.
router.use('/api', apiRoutes);

// *** WILL ADD WILDCARD ROUTE LATER ***

module.exports = router;