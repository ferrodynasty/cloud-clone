const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');

app.use(cookieParser());

const connectToDb = require('./config/db');
connectToDb();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.set("view engine", "ejs");

app.use(express.static('public'));

const indexrouter = require('./router/index.routes');
app.use('/', indexrouter);

const userrouter = require('./router/user.routes');
app.use('/user', userrouter);

const filerouter = require('./router/file.routes');
app.use('/files', filerouter);

app.listen(process.env.PORT || 3000);
