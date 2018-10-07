const { OK, CREATED, INTERNAL_SERVER_ERROR } = require('http-status');

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

exports.post = async (req, res) => {
  
}