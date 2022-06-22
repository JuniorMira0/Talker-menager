const fs = require('fs').promises;

const fileName = './talker.json';

async function talker(req, res) {
  try {
    const fileContent = await fs.readFile(fileName, 'utf-8');
    const parse = JSON.parse(fileContent);
    res.status(200).json(parse);
  } catch (error) {
    res.status(400).json({ message: 'something went wrong' });
  }
}

module.exports = talker;
