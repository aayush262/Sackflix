const UserModel = require('../model/user');
const passwordHash = require('password-hash');

function mapUserData(user,data){
    if(data.name)
        user.name = data.name;
    if(data.email)
        user.email = data.email;
    if(data.password)
        user.password = data.password;
}

module.exports = {
    getIndexPage: function(req,res,next){
        res.render('index.ejs',{
            pageTitle: 'Sackflix',
            description: 'Best video hosting website'
        });
    },
    getLoginPage: function(req,res,next){
        res.render('login.ejs',{
            pageTitle: 'Login',
            description: 'Enjoy by logging in'
        });
    },
    getRegisterPage: function(req,res,next){
        res.render('register.ejs',{
            pageTitle:'Register',
            description: 'Be our member'
        });
    },
    postRegisterPage: function(req,res,next){
        const data = req.body;
        console.log(data);
        const newUser = new UserModel({});
        mapUserData(newUser,data);
        newUser.password = passwordHash.generate(data.password);
        if(data.password === data.cpassword){
            newUser
            .save()
            .then(function(user){
                res.json(user);
            })
            .catch(err=>next(err)); 
        }
        else{
            res.json({
                msg: "hey password didn't match"
            })
        }  
    },
    postLoginPage:function(req,res,next){
        UserModel
            .findOne({
                email: req.body.email
            })
            .exec(function(err,user){
                if(!user){
                    return res.json({
                        msg: 'user not found'
                    })
                }
                if(err){
                    return next(err);
                }
                var isMatched = passwordHash.verify(req.body.password,user.password);
                if(isMatched){
                    res.json(user)
                }else{
                    res.json({
                        msg: 'Invalid password'
                    })
                }
            
            })   
    }
}