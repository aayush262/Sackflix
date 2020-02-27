const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    name:String,
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    status: {
        type: Boolean,
        default: true
    },
    role: {
        type: Number, //1 for admin , 2 for enduser and 3 for visitors
        default: 2
    }
},{
    timestamps: true
});

module.exports = mongoose.model('user',userSchema);