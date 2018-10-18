const router = require('express').Router();

const AccountController = require('../controllers/accounts');

router.get('/', AccountController.get);
router.post('/', AccountController.create);
router.get('/:id', AccountController.getById);
router.put('/:id', AccountController.update);
router.get('/:id/expenses', AccountController.getAllExpenses);
router.post('/:id/expenses', AccountController.createExpense);

module.exports = router;