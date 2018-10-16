const { OK, CREATED, INTERNAL_SERVER_ERROR } = require('http-status');
const { Types } = require('mongoose');

const accountDb = require('../db/account');

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