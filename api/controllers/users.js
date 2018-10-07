const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { CONFLICT, OK, INTERNAL_SERVER_ERROR, CREATED, UNAUTHORIZED } = require('http-status');

const dbUser = require('../db/user');

const hashPassword = (password, salt) => {
  return new Promise((resolve, reject) => {
    bcrypt
      .hash(password, salt)
      .then(result => resolve(result))
      .catch(error => reject(error));
  });
};

exports.signin = async (req, res) => {
  const message = 'Falló la autenticación.';
  const { email, password } = req.body;

  try {
    const user = await dbUser.getUserByEmail(email);

    if (!user) {
      return res.status(UNAUTHORIZED).json({
        error: {
          message
        }
      });
    }

    const success = await bcrypt.compare(password, user.password);
    if (!success) {
      return res.status(UNAUTHORIZED).json({
        error: {
          message
        }
      });
    }

    const token = jwt.sign(
      {
        email: user.email,
        username: user.username,
        userId: user._id
      },
      process.env.JWT_KEY,
      {
        expiresIn: '6h'
      }
    );

    return res.status(OK).json({
      message: 'Token creado',
      user: {
        username: user.username,
        email: user.email
      },
      token
    });
  } catch (error) {
    return res.status(INTERNAL_SERVER_ERROR).json({
      error: {
        message: 'Ocurrió un error al intentar auntenticarse',
        error
      }
    });
  }
};

exports.signup = async (req, res) => {
  let passHashed = null;
  const { email, username, password } = req.body;
  
  try {
    const userExisting = await dbUser.getUserByEmail(email);

    if (userExisting) {
      return res.status(CONFLICT).json({
        message: 'Mail exist'
      });
    }

    passHashed = await hashPassword(password, 10);

    const user = {
      email,
      username,
      password : passHashed
    };

    await dbUser.saveUser(user);
    return res.status(CREATED).json({
      message: '¡Usuario creado!'
    });
  } catch (error) {
    res
      .status(INTERNAL_SERVER_ERROR)
      .json({
        error: {
          message: 'Ocurrió un error al intentar crear el usuario'
        }
      });
  }
};