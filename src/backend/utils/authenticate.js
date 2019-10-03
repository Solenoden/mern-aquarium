const bcrypt = require("bcryptjs");
const axios = require("axios");

const authenticate = (email, password) => {
    return new Promise((resolve, reject) => {
        axios.get("/user/")
        .then((res) => {
            const user = res.data.find((user) => user.email === email);
            console.log(res.data);
            console.log(user);
            console.log("Password: " + password + " user.password:" + user.password);
            console.log(bcrypt.compareSync(password, user.password));
            
            if (bcrypt.compareSync(password, user.password)) {
                console.log('Passworrd is correct');
                resolve({
                    isValid: true,
                    userType: user.userType
                });
            } else {
                resolve({ isValid: false});
            }
        })
        .catch(err => {
            reject("Error: " + err);
        });
    });
}


module.exports = authenticate;