const fs = require('fs');

const fileName = './talker.json';
const created = 201;
const minLength = 1;

const postTalker = (req, res) => {
  const data = JSON.parse(fs.readFileSync(fileName, 'utf-8'));
  const createTalk = { ...req.body, id: data.length + minLength };
  console.log(createTalk);

  fs.writeFileSync(fileName, JSON.stringify([...data, createTalk]));
  res.status(created).json(createTalk);
};

module.exports = postTalker;
