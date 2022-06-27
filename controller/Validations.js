const tokenMin = 16;
const nameMin = 3;
const ageMin = 18;
const minRate = 1;
const maxRate = 5;
const badRequest = 400;
const unauthorized = 401;

const tokenValidator = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization) {
    res.status(unauthorized).json({ message: 'Token não encontrado' });
    return;
  }
  if (authorization.length < tokenMin) {
    res.status(unauthorized).json({ message: 'Token inválido' });
    return;
  }
  next();
};

const nameValidator = (req, res, next) => {
  const { name } = req.body;
  if (!name) {
    res.status(badRequest).json({ message: 'O campo "name" é obrigatório' });
    return;
  }
  if (name.length < nameMin) {
    res
      .status(badRequest)
      .json({ message: 'O "name" deve ter pelo menos 3 caracteres' });
    return;
  }
  next();
};

const ageValidator = (req, res, next) => {
  const { age } = req.body;
  if (!age) {
    res.status(badRequest).json({
      message: 'O campo "age" é obrigatório',
    });
    return;
  }
  if (age < ageMin) {
    res.status(badRequest).json({
      message: 'A pessoa palestrante deve ser maior de idade',
    });
    return;
  }
  next();
};

const talkValidator = (req, res, next) => {
  const { talk } = req.body;
  if (!talk) {
    res.status(badRequest).json({
      message: 'O campo "talk" é obrigatório',
    });
    return;
  }
  if (!talk.watchedAt) {
    res
      .status(badRequest)
      .json({ message: 'O campo "watchedAt" é obrigatório' });
    return;
  }
  next();
};

const dateValidator = (watchedAt) => {
  const regExpData = /^([0-3][0-1]|[0-2]\d)\/(0[1-9]|1[0-2])\/\d{4}/;
  return regExpData.test(watchedAt);
};

const watchedAtValidator = (req, res, next) => {
  const { talk } = req.body;
  if (!dateValidator(talk.watchedAt)) {
    res
      .status(badRequest)
      .json({ message: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"' });
    return;
  }
  next();
};

const rateValidator = (req, res, next) => {
  const { talk } = req.body;
  if (talk.rate > maxRate || talk.rate < minRate) {
    res
      .status(badRequest)
      .json({ message: 'O campo "rate" deve ser um inteiro de 1 à 5' });
    return;
  }
  if (!talk.rate) {
    res.status(badRequest).json({ message: 'O campo "rate" é obrigatório' });
    return;
  }
  next();
};

module.exports = {
  tokenValidator,
  nameValidator,
  ageValidator,
  talkValidator,
  watchedAtValidator,
  rateValidator,
};
