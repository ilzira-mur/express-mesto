const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const isEmail = require('validator/lib/isEmail');
const isStrongPassword = require('validator/lib/isStrongPassword');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 2,
    maxLength: 30,
    default: 'Жак-Ив Кусто',
  },
  about: {
    type: String,
    minlength: 2,
    maxLength: 30,
    default: 'Исследователь',
  },
  avatar: {
    type: String,
    minlength: 1,
    default: 'https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png',
    validate: {
      validator(v) {
        return v.match(/^(https?:\/\/)(www\.)?([\da-z-]+)\.([a-z.]{2,6})[\da-z-._~:?#[\]@!$&'()*+,;=/]*\/?#?$/);
      },
      message: 'Неправильная ссылка!',
    },
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: (email) => isEmail(email),
      message: 'Ошибка Email',
    },
  },
  password: {
    type: String,
    required: true,
    minlength: 4,
    validate: {
      validator: (password) => isStrongPassword(password),
      message: 'Ненадежный пароль',
    },
  },
});

userSchema.statics.findUserByCredentials = function findUserByCredentials(email, password) {
  return this.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) {
        return Promise.reject(new Error('Неправельная почта'));
      }
      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            return Promise.reject(new Error('Неправельный пароль'));
          }
          return user;
        });
    });
};

module.exports = mongoose.model('user', userSchema);
