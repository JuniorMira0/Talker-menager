const fs = require('fs');

const fileName = './talker.json';
const noContent = 204;

const deleteTalker = (req, res) => {
  const { id } = req.params;
  const data = JSON.parse(fs.readFileSync(fileName, 'utf-8'));
  const newTalker = data.findIndex((talker) => talker.id === Number(id));

  data.splice(newTalker, 1);
  fs.writeFileSync(fileName, JSON.stringify(data));
  res.status(noContent).end();
};

module.exports = deleteTalker;