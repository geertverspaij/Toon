const fs = require("fs");
const path = require("path");

module.exports = async function (req, res) {
  try {
    const basePath = path.join(__dirname, "..", "..", "public", "images");

    const folders = fs.readdirSync(basePath).filter((file) => {
      return fs.statSync(path.join(basePath, file)).isDirectory();
    });
    console.error(folders);

    const result = {};

    for (const folder of folders) {
      const folderPath = path.join(basePath, folder);
      const files = fs.readdirSync(folderPath).filter((file) => {
        return file.toLowerCase().endsWith(".jpg") ||
               file.toLowerCase().endsWith(".jpeg") ||
               file.toLowerCase().endsWith(".png");
      });

      result[folder] = files.map(f => `/images/${folder}/${f}`);
      console.log(result[folder]);
    }

    res.status(200).json(result);
  } catch (err) {
    console.error(err);
    res.status(200).json({ error: err.message, stack: err.stack });
  }
};
