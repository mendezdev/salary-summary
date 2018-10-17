const { OK, CREATED, INTERNAL_SERVER_ERROR } = require('http-status');
const { Types } = require('mongoose');

const accountDb = require('../db/account');
const expenseDb = require('../db/expense');

exports.get = async (req, res) => {
  try {
    const accounts = await accountDb.getAll();
    res.status(OK).json(accounts);
  } catch (err) {
    res.status(INTERNAL_SERVER_ERROR).json({
      error: {
        message: 'Ocurrió un error al intentar obtener las cuentas.',
        error: err
      }
    });
  }
}

exports.getById = async (req, res) => {
  try {
    const account = await accountDb.getById(req.params.id);
    res.status(OK).json(account);
  } catch (err) {
    res.status(INTERNAL_SERVER_ERROR).json({
      error: {
        message: 'Ocurrió un error al intentar obtener las cuentas.',
        error: err
      }
    });
  }
}

exports.create = async (req, res) => {
  const {
    name, amount, spenders
  } = req.body;

  let accountData = {
    name,
    amount
  }

  let idSpenders = null
  if (spenders) {
    if (spenders.length > 0) {
      idSpenders = spenders.map(id => {
        return Types.ObjectId(id)
      });
    }
  }

  if (idSpenders) {
    accountData.spenders = idSpenders;
  }

  try {
    await accountDb.create(accountData);
    
    res.status(CREATED).json({
      message: '¡Cuenta creada con éxito!'
    });
  } catch (err) {
    res.status(INTERNAL_SERVER_ERROR).json({
      message: 'Ocurrió un error al intentar crear la cuenta.',
      error: err
    });
  }
}

exports.createExpense = async (req, res) => {
  const accountId = req.params.id
  
  const expenseData = {
    amount: req.body.amount,
    description: req.body.description,
    userInformation: req.body.userInformation,
    accountId 
  };

  try {
    const createdExpense = await expenseDb.create(expenseData);
    const account = await accountDb.getById(accountId);
    const accountOpt = {
      amount: account.amount - createdExpense.amount
    };
    await accountDb.update(accountId, accountOpt);
    
    res.status(OK).json({
      message: '¡Gasto creado con éxito!',
      expense: createdExpense
    });
  } catch (err) {
    res.status(INTERNAL_SERVER_ERROR).json({
      message: 'Ocurrió un error al intentar crear el gasto.',
      error: err
    })
  }
}

exports.getAllExpenses = async (req, res) => {
  try {
    const expenses = await expenseDb.getByAccountId(req.params.id);
    res.status(OK).json(expenses);
  } catch (err) {
    res.status(INTERNAL_SERVER_ERROR).json({
      error: {
        message: 'Ocurrió un error al intentar obtener los gastos de la cuenta que esta consultado.',
        error: err
      }
    });
  }
}