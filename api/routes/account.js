const router = require('express').Router();

const checkAuth = require('../middlewares/check-auth');
const AccountController = require('../controllers/accounts');

router.get('/', checkAuth, AccountController.get);
router.post('/', checkAuth, AccountController.create);
router.get('/:id', checkAuth, AccountController.getById);
router.put('/:id', checkAuth, AccountController.update);
router.get('/:id/expenses', checkAuth, AccountController.getAllExpenses);
router.post('/:id/expenses', checkAuth, AccountController.createExpense);

module.exports = router;