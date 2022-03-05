const jwt = require('jsonwebtoken')
const User = require('../model/User')

const auth = async (req,res,next) =>{


   try{ 
    const token = req.header('Authorization').replace('Bearer ','')
    const decode = jwt.verify(token,process.env.JWT_SECRET)
    const loggedInUser = await User.findOne({_id:decode._id,'tokens.token':token})

    if(!loggedInUser){
        throw new Error()
    }

    req.loggedInUser = loggedInUser
    req.token = token
    next()
    }
    catch(e){
         res.status('401').send({error:'Please Authenticate.'})
    }
}

module.exports = auth