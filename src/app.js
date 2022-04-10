const express = require('express');
const path = require('path');
const mainRoutes = require('./routes/mainRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

app.set('view engine', 'ejs');
app.set('views', path.resolve(__dirname, 'views'));
app.use(express.static(path.resolve(process.cwd(), 'src', 'public')));
app.use('/', mainRoutes);

// eslint-disable-next-line no-console
app.listen(PORT, () => console.log(`Running on port ${PORT}`));
