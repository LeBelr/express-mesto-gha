const usersRouter = require('express').Router();
const {
  getAllUsers, getUserById, changeProfile, changeAvatar, getMyInfo,
} = require('../controllers/users');
const { validateChangeProfile, validateChangeAvatar } = require('../middlewares/validate');

usersRouter.get('/', getAllUsers);
usersRouter.get('/:userId', getUserById);
usersRouter.get('/me', getMyInfo);
usersRouter.patch('/me', validateChangeProfile, changeProfile);
usersRouter.patch('/me/avatar', validateChangeAvatar, changeAvatar);

module.exports = usersRouter;
