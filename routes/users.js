const userRouter = require('express').Router();
const {
  getUsers, createUser, getUserId, updateUserInfo, updateUserAvatar,
} = require('../controllers/users');

userRouter.get('/users', getUsers);
userRouter.get('/users/:userId', getUserId);
userRouter.post('/users', createUser);
userRouter.patch('/users/me', updateUserInfo);
userRouter.patch('/users/me/avatar', updateUserAvatar);

module.exports = userRouter;
