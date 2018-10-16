const router = require('express').Router();

const AccountController = require('../controllers/accounts');

router.get('/', AccountController.get);
router.post('/', AccountController.create);

module.exports = router;