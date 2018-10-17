const router = require('express').Router();

const AccountController = require('../controllers/accounts');

router.get('/', AccountController.get);
router.get('/:id', AccountController.getById);
router.post('/', AccountController.create);
router.get('/:id/expenses', AccountController.getAllExpenses);
router.post('/:id/expenses', AccountController.createExpense);

module.exports = router;