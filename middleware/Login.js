const crypto = require('crypto');
// https://www.w3schools.com/nodejs/ref_crypto.asp

const Login = (req, res) => {
  try {
    const token = crypto.randomBytes(8).toString('hex');
    res.status(200).send({ token });
  } catch (error) {
    res.status(404).json({ message: 'something went wrong' });
  }
};

module.exports = Login;
