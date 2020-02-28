const jwt = require('jsonwebtoken');
const config = require('../configs');

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
            console.log(decoded);
            next();
        })
    }else{
        return next({
            msg: "Token not provided",
            status: 400
        })
    }
}