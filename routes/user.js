const Router= require('express').Router();
const userController = require('../controllers/user');
Router.route('/')
    .get(userController.getMoviePage);

Router.route('/users')
    .get(userController.findAllUsers);

module.exports = Router;