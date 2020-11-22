var
  express = require('express'),
  router = express.Router();

router.use('/api/auth', require('./authapi'));
router.use('/api/shares', require('./sharesapi'));
router.use('/api/mail', require('./mailapi'));

module.exports = router;