/* eslint-disable */
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const validator = require('validator');
const crypto = require('crypto');
// user schema 
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: true,
        max: 32
    },
    email: {
        type: String,
        trim: true,
        required: true,
        unique: true,
        lowercase: true,
        validate: [validator.isEmail]
    },
    hashPassword: {
        type: String,
        required: true,
        minlength: 8
    },
    salt: String,
    address: {
        type: String,
        required: true
    },
    privateKey:{
        type: String,
        required: true
    } ,
    token:{
        type: String,
        required: true
    }
}, {timestamps: true});

userSchema.virtual('password')
.set(function(password) {
    this._password = password,
    this.salt = 12,
    this.hashPassword = this.securePassword(password)
}).get(function() {
    return this._password
})

userSchema.methods = {
    authenticate: function(plainpassword){ 
        return this.securePassword(plainpassword) === this.hashPassword
    },
    securePassword: function(plainpassword){
        if(!plainpassword) return "";
        try{
            return crypto.createHmac("sha256", this.salt).update(plainpassword).digest("hex")
        }
        catch(err){
            return "";
        }
    }
}
module.exports = mongoose.model("User", userSchema);

