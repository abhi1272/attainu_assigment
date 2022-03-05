const userController = require("./../../app/controller/userController");

module.exports.setRouter = (app) => {

    app.post(`/user/register`, userController.signUpFunction);

    app.post(`/user/login`, userController.loginFunction);

};