// Modules
const path = require('path');
const fs = require('fs');
const express = require('express');
const methodOverride = require('method-override');
const sessions = require('express-session');
const usuarioEnSessionMiddleware = require('./middlewares/usuarioEnSessionMiddleware');
const { googleMaps } = require('../config');

// Instances and constants
const app = express();
const PORT = process.env.PORT || 3000;

// App settings
app.set('view engine', 'ejs');
app.set('views', path.resolve(process.cwd(), 'src', 'views'));

// Middlewares
app.use(express.static(path.resolve(process.cwd(), 'src', 'public')));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(methodOverride('_method'));
app.use(sessions({
  secret: '9*&nyvasD70AhsCNhcye)@q(e*h!@)(',
  saveUninitialized: false,
  resave: false,
}));
app.use(usuarioEnSessionMiddleware);

// Dynamic routers import and setting as middleware
const routers = fs.readdirSync('./src/routes/');
for (let i = 0; i < routers.length; i += 1) {
  // eslint-disable-next-line global-require, import/no-dynamic-require
  app.use(`/${routers[i] === 'mainRoutes.js' ? '' : routers[i].replace('Routes.js', '')}`, require(`./routes/${routers[i]}`));
}

// Locals
app.locals.googleMaps = googleMaps;

// eslint-disable-next-line no-console
app.listen(PORT, () => console.log(`Running on port ${PORT}`));
