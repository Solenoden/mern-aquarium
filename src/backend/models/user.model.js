const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const userSchema = new Schema({
    email: {type: String, unique: true, required: true},
    password: {type: String, required: true},
    userType: {type: String, required: true},
    tokens: [{
        token: {
            type: String,
            required: true
        }
    }]
}, 
{
    timestamps: true
});

userSchema.methods.generateAuthToken = async function() {
    const user = this;

    const token = jwt.sign({_id: user._id}, "mernaquarium");

    user.tokens = user.tokens.concat({token});
    await user.save();

    return token;
};

userSchema.statics.findByCredentials = (email, password) => {
    return new Promise((resolve, reject) => {
        User.findOne({email: email})
            .then((user) => {
                if(bcrypt.compareSync(password, user.password)) {
                    resolve(user);
                } else {
                    reject("Could not Login.")
                }
            })
            .catch(() => reject("Could not login."));
    });
};



const User = mongoose.model("User", userSchema);

module.exports = User;