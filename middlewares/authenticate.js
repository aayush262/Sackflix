const jwt = require('jsonwebtoken');
const config = require('../configs');
const UserModel = require('../model/user');

module.exports = function(req,res,next){
    var token;
    if(req.headers['x-access-token']){
        token = req.headers['x-access-token'];
    }
    if(req.headers['authorization']){
        token = req.headers['authorization'];
    }
    if(token){
        jwt.verify(token,config.secret,function(err,decoded){
            if(err){
                return next(err)
            }
            UserModel   
                .findOne({
                    _id: decoded._id
                })
                .exec(function(err,user){
                    if(err){
                        return next(err);
                    }
                    if(!user){
                        return  res.json({
                            msg: 'no user found pls register'
                        })
                    }
                    req.loggedInUser = user;
                    next();
                })
            
        })
    }else{
        return next({
            msg: "Token not provided",
            status: 400
        })
    }
}