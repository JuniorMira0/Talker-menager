const fs = require('fs').promises;

const fileName = './talker.json';

async function talker(req, res) {
  const fileContent = await fs.readFile(fileName, 'utf-8');
  const parse = JSON.parse(fileContent);
  res.status(200).json(parse);
}

module.exports = talker;
