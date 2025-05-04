const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema ({
    name: {
        type: String,
        required: true
    },
    email : {
        type: String,
        required: [true, "This field is required"],
        unique: true,
    },
    password : {
        type: String,
        required: true
    },
    role : { 
        type: String,
        enum: ['customer', 'admin'],
        default: "customer"
    },
    address: {
        street: String,
        city: String,
        state: String,
        zipCode: String,
        country: String,
    },
    createdAt : {
        type: Date,
        createdAt: Date.now
    },
    avatarURL : {
        type: String
    }
});

const User = mongoose.model('User', UserSchema);
module.exports = User;