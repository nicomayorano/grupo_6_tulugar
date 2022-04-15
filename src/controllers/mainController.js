/* eslint-disable no-continue */
const fs = require('fs');
const path = require('path');

function getViewsFilenames(files = [], route = '') {
  const dirContent = fs.readdirSync(path.resolve(__dirname, '../views', route));
  for (let i = 0; i < dirContent.length; i += 1) {
    if (dirContent[i] === 'partials') continue;
    else if (dirContent[i] === 'index.ejs') {
      files.push('index');
    } else if (!dirContent[i].includes('.')) getViewsFilenames(files, dirContent[i]);
    else files.push(`${route}/${dirContent[i]}`.replace(/\.[A-Za-z]+/, ''));
  }
  return files;
}

const dirNames = getViewsFilenames();
const mainController = {};
for (let i = 0; i < dirNames.length; i += 1) {
  const fn = (req, res) => res.render(dirNames[i]);
  Object.defineProperty(
    mainController,
    dirNames[i],
    {
      value: fn,
      writable: true,
      enumerable: true,
      configurable: true,
    },
  );
}

module.exports = mainController;
