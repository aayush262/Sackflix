const UserModel = require('../model/user');


module.exports= {
    getMoviePage: function(req,res,next){
        const user = req.session.user.user;
        res.render('user/movies.ejs',{
            pageTitle: 'Movies',
            description: 'Enjoy all exciting movies here',
            user
        })
    },
    findAllUsers: function(req,res,next){
        UserModel.find({})
            .exec(function(err,users){
                if(err){
                    return next(err);
                }
                if(!users){
                    return res.json({
                        msg: "No users"
                    })
                }
                res.json(users);
            })
    }
}