const express = require('express');
const config = require('./configs');
const app = express();
const ejs = require('ejs');
const path = require('path');
const authRoutes = require('./routes/auth');
const bodyParser = require('body-parser');

require('./db');

app.use(bodyParser.urlencoded({
    extended: true
}))

app.set('view engine',ejs);
app.set('views',path.join(__dirname,'views'));

app.use(express.static(path.join(__dirname,'public')));

app.use('/',authRoutes);
app.use((error,req,res,next)=>{
    res.json({
        msg: error,
        status: 404
    })
})

app.listen(config.port,function(err,done){
    if(err){
        console.log(err);
    }else{
        console.log('Server started listening at port '+ config.port);
    }
})