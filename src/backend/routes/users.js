const bcrypt = require("bcryptjs");
const auth = require("../middleware/auth");

const router = require("express").Router();
let User = require("../models/user.model");

router.route("/").get(auth, (req, res) => {
    User.find()
        .then(users => res.json(users))
        .catch(err => res.status(400).json(err));
});

router.route("/me").get(auth, (req, res) => {
    res.json(req.user);
});

router.route("/:id").get((req, res) => {
    User.findById(req.params.id)
        .then(user => res.json(user))
        .catch(err => res.status(400).json(err));
});

router.route("/add").post((req, res) => {
    const email = req.body.email;
    const password = bcrypt.hashSync(req.body.password, 8);
    const userType = req.body.userType;

    const newUser = new User({
        email, 
        password, 
        userType
    });

    newUser.save()
        .then(() => {
            const token = newUser.generateAuthToken();
            res.json({newUser, token});
        })
        .catch(err => res.status(400).json(err));
});

router.route("/update/:id").post((req, res) =>{
    User.findById(req.params.id)
        .then(user => {
            user.email = req.body.email;
            user.password = bcrypt.hashSync(req.body.password);
            user.userType = req.body.userType;

            user.save()
                .then(() => res.json("User successfully updated."))
                .catch(err => res.status(400).json(err));
        })
        .catch(err => res.status(400).json(err));
});

router.route("/delete/:id").delete((req, res) => {
    User.findByIdAndDelete(req.params.id)
        .then(() => res.json("User successfully deleted."))
        .catch(err => res.status(400).json(err));
});

router.route("/login").post((req, res) => {
    User.findByCredentials(req.body.email, req.body.password)
        .then(async (user) => {
            const token = await user.generateAuthToken();
            res.json({user: {_id: user._id, email: user.email, userType: user.userType}, token})
        })
        .catch((err) => res.status(404).json("ERROR: " + err));
});

router.route("/logoutAll").post(auth, async (req, res) => {
    try {
        req.user.tokens = [];
        await req.user.save();

        res.send("Logged out of all sessions");
    } catch (e) {
        res.status(404).json(e);
    }
});

router.route("/logout").post(auth, async (req, res) => {
    try {
        req.user.tokens = req.user.tokens.filter((token) => {
            token.token != req.token;
        });
        await req.user.save();

        res.send("Successfully logged out.");
    } catch (e) {
        res.status(404).json(e);
    }
});

module.exports = router;