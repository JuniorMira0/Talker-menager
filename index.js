const express = require('express');
const bodyParser = require('body-parser');

const talker = require('./middleware/Talker');
const talkerID = require('./middleware/TalkerID');
const Login = require('./middleware/Login');

const app = express();
app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
const PORT = '3000';

app.get('/talker/:id', talkerID);

app.get('/talker', talker);

app.post('/login', Login);

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.listen(PORT, () => {
  console.log('pai ta on');
});
