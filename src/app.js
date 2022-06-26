/* eslint-disable global-require */
/* eslint-disable no-console */

// Modules
const { resolve } = require('path');
const express = require('express');
const methodOverride = require('method-override');
const sessions = require('express-session');
const cookies = require('cookie-parser');
const dotenv = require('dotenv');
const sessionMiddleware = require('./middlewares/session');
const db = require('./database/index');
const { readFilesRec, getRouters } = require('./helpers');

// Instances and constants
const app = express();
const PORT = process.env.PORT || 3000;
const { sequelize } = db;
dotenv.config();

// App settings
app.set('view engine', 'ejs');
app.set('views', resolve(process.cwd(), 'src', 'views'));

// Middlewares
app.use(express.static(resolve(process.cwd(), 'src', 'public')));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(methodOverride('_method'));
app.use(sessions({
  cookie: {
    maxAge: 1000 * 60 * 15,
  },
  secret: '9*&nyvasD70AhsCNhcye)@q(e*h!@)(',
  saveUninitialized: false,
  resave: false,
}));
app.use(cookies());
app.use(sessionMiddleware);

// Dynamic routers import and setting as middleware
readFilesRec(resolve(process.cwd(), 'src', 'routes'))
  .then((result) => {
    const routes = Object.entries(getRouters(result));
    for (let i = 0; i < routes.length; i += 1) {
      const [key, value] = routes[i];
      // eslint-disable-next-line import/no-dynamic-require
      app.use(key, require(`./${value}`));
    }
  });

// Locals
app.locals.googleMaps = process.env.GOOGLEMAPS;

// DB auth
sequelize.authenticate()
  .then(() => {
    console.log('Database connection has been established successfully.');
  })
  .catch((error) => {
    console.error('Unable to connect to the database:', error);
  });

app.listen(PORT, () => console.log(`Running on port ${PORT}`));
