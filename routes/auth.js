const Router = require('express').Router();
const authController = require('../controllers/auth');

Router.route('/')
    .get(authController.getIndexPage);

Router.route('/login')
    .get(authController.getLoginPage)
    .post(authController.postLoginPage);

Router.route('/register')
    .get(authController.getRegisterPage)
    .post(authController.postRegisterPage);

module.exports = Router;