// Modules
const express = require('express');
const path = require('path');
const fs = require('fs');
const methodOverride = require('method-override');

//Session Managment
const cookieParser = require("cookie-parser");
const sessions = require('express-session');

// Instances and constants
const app = express();
const PORT = process.env.PORT || 3020;

// App settings
app.set('view engine', 'ejs');
app.set('views', path.resolve(process.cwd(), 'src', 'views'));

// Middlewares
app.use(express.static(path.resolve(process.cwd(), 'src', 'public')));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(methodOverride('_method'));

// Parameters of sessions
const oneDay = 1000 * 60 * 60 * 24;

//session middleware
app.use(sessions({
    secret: "thisismysecrctekeyfhrgfgrfrty84fwir767",
    saveUninitialized:true,
    cookie: { maxAge: oneDay },
    name:'session',
    resave: false
}));
// cookie parser middleware
app.use(cookieParser());

// Dynamic routers import and setting as middleware
const routers = fs.readdirSync('./src/routes/');
for (let i = 0; i < routers.length; i += 1) {
  // eslint-disable-next-line global-require, import/no-dynamic-require
  app.use(`/${routers[i] === 'mainRoutes.js' ? '' : routers[i].replace('Routes.js', '')}`, require(`./routes/${routers[i]}`));
}

// eslint-disable-next-line no-console
app.listen(PORT, () => console.log(`Running on port ${PORT}`));
