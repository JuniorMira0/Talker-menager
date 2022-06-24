const crypto = require('crypto');
// https://www.w3schools.com/nodejs/ref_crypto.asp

const HTTP_OK_STATUS = 200;
const HTTP_OK_FAIL = 404;
const HTTP_FAIL = 400;
const pswLength = 6;

const mailRequire = { message: 'O campo "email" é obrigatório' };
const mailValid = { message: 'O "email" deve ter o formato "email@email.com"' };
const pswRequired = { message: 'O campo "password" é obrigatório' };
const pswValid = { message: 'O "password" deve ter pelo menos 6 caracteres' };
const error404 = { message: 'something went wrong' };

const isMailValid = (email) => {
  const regexEmail = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;
  return regexEmail.test(email) === true;
};

const validation = (res, email, password) => {
  if (!email) {
    res.status(HTTP_FAIL).json(mailRequire);
    return;
  }
  if (!isMailValid(email)) {
    res.status(HTTP_FAIL).json(mailValid);
    return;
  }
  if (!password) {
    res.status(HTTP_FAIL).json(pswRequired);
    return;
  }
  return res.status(HTTP_FAIL).json(pswValid);
};

const Login = (req, res) => {
  const { email, password } = req.body;
  const token = crypto.randomBytes(8).toString('hex');

  try {
    if (isMailValid(email) && password && password.length >= pswLength) {
      res.status(HTTP_OK_STATUS).json({ token });
    }
  } catch (error) {
    res.status(HTTP_OK_FAIL).json(error404);
  }

  validation(res, email, password);
};

module.exports = Login;
