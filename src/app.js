// Imports
const express = require('express');
const fs = require('fs');
const path = require('path');

// Instances and constants
const app = express();
const PORT = 3000;

app.use(express.static(path.resolve(__dirname, 'public/')));

const files = fs.readdirSync('./src/views/');
for (let i = 0; i < files.length; i += 1) {
  app.get(`/${files[i] === 'index.html' ? '' : files[i].replace('.html', '')}`, (req, res) => {
    res.sendFile(path.resolve(__dirname, `views/${files[i]}`));
  });
}
// eslint-disable-next-line no-console
app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
