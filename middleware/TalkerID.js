const fs = require('fs');

const fileName = './talker.json';

const talkerID = (req, res) => {
  try {
    const { id } = req.params;
    const fileContent = JSON.parse(fs.readFileSync(fileName, 'utf8'));
    const searchID = fileContent.find(
      (contentID) => contentID.id === Number(id),
    );
    if (!searchID) {
      return res
        .status(404)
        .json({ message: 'Pessoa palestrante não encontrada' });
    }
    return res.status(200).json(searchID);
  } catch (error) {
    return res.status(404).json({ message: 'something went wrong' });
  }
};

module.exports = talkerID;
