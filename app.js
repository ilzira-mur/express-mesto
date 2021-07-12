const express = require('express');
const mongoose = require('mongoose');
const router = require('express').Router();

const userRouter = require('./routes/users');
const cardRouter = require('./routes/cards');

const app = express();

const { PORT = 3000 } = process.env;

mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});

app.use((req, res, next) => {
  req.user = {
    _id: '60e547229f76c1210f5abf91',
  };
  next();
});

app.use(userRouter);
app.use(cardRouter);

router.use((req, res) => {
  res.status(404).send({ message: `По адресу ${req.path} ничего не найдено` });
});

app.listen(PORT, () => {
});
