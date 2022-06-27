const fs = require('fs');

const fileName = './talker.json';

const putTalkerID = (req, res) => {
  const { id } = req.params;
  const data = JSON.parse(fs.readFileSync(fileName, 'utf-8'));
  const newTalker = data.findIndex((talker) => talker.id === Number(id));

  const { name, age, talk } = req.body;
  data[newTalker] = {
    ...data[newTalker],
    name,
    age,
    talk,
  };

  fs.writeFileSync(fileName, JSON.stringify(data));
  res.status(200).json({ id: +id, ...req.body });
};

module.exports = putTalkerID;