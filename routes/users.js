const usersRouter = require('express').Router();
const { getAllUsers, getUserById, createUser, changeProfile, changeAvatar } = require('../controllers/users');

usersRouter.get('/', getAllUsers);
usersRouter.get('/:userId', getUserById);
usersRouter.post('/', createUser);
usersRouter.patch('/me', changeProfile);
usersRouter.patch('/me/avatar', changeAvatar);

module.exports = usersRouter;