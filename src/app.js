// Native modules
const express = require('express');
const path = require('path');
const fs = require('fs');
const methodOverride = require('method-override');
const cors = require('cors');
const bodyParser = require('body-parser');

// Instances and constants
const app = express();
const PORT = process.env.PORT || 3000;

// App settings
app.set('view engine', 'ejs');
app.set('views', path.resolve(process.cwd(), 'src', 'views'));

// Middlewares
app.use(express.static(path.resolve(process.cwd(), 'src', 'public')));
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(methodOverride('_method'));

// Dynamic routers import and setting as middleware
const routers = fs.readdirSync('./src/routes/');
for (let i = 0; i < routers.length; i += 1) {
  // eslint-disable-next-line global-require, import/no-dynamic-require
  app.use(`/${routers[i] === 'mainRoutes.js' ? '' : routers[i].replace('Routes.js', '')}`, require(`./routes/${routers[i]}`));
}

// eslint-disable-next-line no-console
app.listen(PORT, () => console.log(`Running on port ${PORT}`));
