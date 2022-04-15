// Native modules
const express = require('express');
const path = require('path');

// Routers imports
const mainRouter = require('./routes/mainRoutes');
const userRouter = require('./routes/userRoutes');
const productRouter = require('./routes/productRoutes');
const adminRouter = require('./routes/adminRoutes');

// Instances and constants
const app = express();
const PORT = process.env.PORT || 3000;

// App settings
app.set('view engine', 'ejs');
app.set('views', path.resolve(__dirname, 'views'));

// Middlewares
app.use(express.static(path.resolve(process.cwd(), 'src', 'public')));
app.use('/', mainRouter);
app.use('/products', productRouter);
app.use('/users', userRouter);
app.use('/admin', adminRouter);

// eslint-disable-next-line no-console
app.listen(PORT, () => console.log(`Running on port ${PORT}`));
