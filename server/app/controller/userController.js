const express = require('express')
const response = require('../libs/responseLib');

/* Models */
const User = require('../model/User');

let signUpFunction = async (req, res) => {
  
    let newUser = new User(req.body);

    try{
        await newUser.save();
        let apiResponse = response.generate(false,'You are successfully registered',200,{newUser});
        res.send(apiResponse);
    }
    catch(e){
        let apiResponse = response.generate(true,e,500,null);
        res.status('500').send(apiResponse);
    }

};// end user signup function 

// start of login function 
let loginFunction = async (req, res) => {
    try{
        console.log(req.body.username,req.body.password)
        let user = await User.findByCredentials(req.body.username,req.body.password);
        const token = await user.generateAuthToken();
        let apiResponse = response.generate(false,'You are successfully logged in',200,{user,token});
        res.send(apiResponse);
    }
    catch(e){
        res.status('500').send('username or password is wrong');
    }
};

module.exports = {

    signUpFunction: signUpFunction,
    loginFunction: loginFunction

};