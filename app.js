const express = require('express');
const mongoose = require('mongoose');
const router = require('express').Router();
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const authRouter = require('./routes/auth');
const userRouter = require('./routes/users');
const cardRouter = require('./routes/cards');
const NotFoundError = require('./errors/NotFoundError');
const { errorHandler } = require('./middlewares/errorHandler');

const app = express();

const { PORT = 3000 } = process.env;

mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});

app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(authRouter);
app.use(userRouter);
app.use(cardRouter);

app.use(errorHandler);

router.use((req) => {
  throw new NotFoundError(`По адресу ${req.path} ничего не найдено`);
});

app.listen(PORT, () => {
});
