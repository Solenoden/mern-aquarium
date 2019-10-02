const jwt = require("jsonwebtoken");
const User = require("../models/user.model");

const auth = async function(req, res, next) {
    try {
        const token = req.header("Authorization").replace("Bearer ", "");
        const decoded = jwt.verify(token, "mernaquarium");
    
        const user = await User.findOne({_id: decoded._id, "tokens.token": token});

        if(!user) {
            throw new Error();
        }

        req.token = token;
        req.user = user

        console.log("Auth complete");

        next();
    } catch (error) {
        console.log("Please authenticate.");
        res.status(401).send({error: "Please authenticate."});
    }
};

module.exports = auth;