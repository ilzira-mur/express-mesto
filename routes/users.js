const userRouter = require('express').Router();
const auth = require('../middlewares/auth');
const {
  getUsers, getUser, getUserId, updateUserInfo, updateUserAvatar,
} = require('../controllers/users');

userRouter.get('/users', auth, getUsers);
userRouter.get('/users/:userId', auth, getUserId);
userRouter.get('/users/me', auth, getUser);
userRouter.patch('/users/me', auth, updateUserInfo);
userRouter.patch('/users/me/avatar', auth, updateUserAvatar);

module.exports = userRouter;
