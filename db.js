const mongoose = require('mongoose');
const dbconfig = require('./configs/dbconfig');

mongoose.connect(`${dbconfig.conxnURL}/${dbconfig.dbName}`,{
    useNewUrlParser: true,
    useUnifiedTopology: true
},function(err,done){
    if(err){
        console.log(err);
    }
})