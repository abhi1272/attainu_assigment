'use strict';
/** Module Dependencies **/
const appConfig = require('../../config/appConfig')
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const mongoose = require('mongoose'),
  Schema = mongoose.Schema;

let userSchema = new Schema({
  username: {
    type: String,
    trim:true,
    required:true
  },
  password: {
    type: String,
    trim:true,
    required:true
  }
},
{
  timestamps:true
}
);


userSchema.methods.toJSON = function(){
  const findUser = this;

  const userObject = findUser.toObject();
  
  delete userObject.password;
  delete userObject.tokens;

  return userObject;
};

userSchema.methods.generateAuthToken = async function(){

  try {
    let newUser = this;
    console.log(appConfig.JWT_SECRET)

    let token = jwt.sign({_id:newUser._id.toString()},'ransom');
    await newUser.save();
    return token;
  }catch(error){
    console.log(error)
    throw error
  }

};

userSchema.statics.findByCredentials = async (email,password) => {

  try {
    let foundUSer = await User.findOne({email});
    if(!foundUSer){
      throw new Error('Unable to login');
    }
    let isMatch = await bcrypt.compare(password,foundUSer.password);
    if(!isMatch){
      throw new Error('Unable to login');
    }
  
    return foundUSer;
  }catch(error){
    console.log(error)
    throw error
  }

};

userSchema.pre('save', async function(next){

    try{
      let user = this;

      if(user.isModified('password')){
          user.password = await bcrypt.hash(user.password,8);
      }
  
      next()
    }catch(error){
      next()
      console.log(error)
      throw error
    }

});

const User = mongoose.model('User', userSchema);

module.exports = User;