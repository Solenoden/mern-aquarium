const router = require("express").Router();
let Fish = require("../models/fish.model");

const auth = require("../middleware/auth");

router.route("/").get((req, res) => {
    Fish.find()
    .then(fishes => res.json(fishes))
    .catch(err => res.status(400).json("ERROR: " + err));
});

router.route("/:id").get((req, res) => {
    Fish.findById(req.params.id)
    .then(fish => res.json(fish))
    .catch(err => res.status(400).json("ERROR: " + err));
});

router.route("/add").post(auth, (req, res) => {
    // Get values from the body
    const name = req.body.name;
    const description = req.body.description;
    const fishType = req.body.fishType;
    const tempBottom = req.body.tempBottom;
    const tempTop = req.body.tempTop;
    const phBottom = req.body.phBottom;
    const phTop = req.body.phTop;
    const diet = req.body.diet;
    const size = req.body.size;
    const temperament = req.body.temperament;
    const tankMates = req.body.tankMates;
    const enemies = req.body.enemies;
    const imgURL = req.body.imgURL;
    // Instantiate object with the body values
    const newFish = new Fish({
        name,
        description,
        fishType,
        tempBottom,
        tempTop,
        phBottom,
        phTop,
        diet,
        size,
        temperament,
        tankMates,
        enemies,
        imgURL
    });

    newFish.save()
    .then(() => res.json("Fish species added"))
    .catch(err => res.status(400).json("ERROR: " + err));
});

router.route("/:id").delete(auth, (req, res) => {
    Fish.findByIdAndDelete(req.params.id)
    .then(() => res.json("Fish species deleted"))
    .catch(err => res.status(400).json("ERROR: " + err));
});

router.route("/update/:id").post(auth, (req, res) => {
    // Find fish with the ID and change it's values
    Fish.findById(req.params.id)
    .then(fish => {
        fish.name = req.body.name;
        fish.description = req.body.description;
        fish.fishType = req.body.fishType;
        fish.tempBottom = req.body.tempBottom;
        fish.tempTop = req.body.tempTop;
        fish.phBottom = req.body.phBottom;
        fish.phTop = req.body.phTop;
        fish.diet = req.body.diet;
        fish.size = req.body.size;
        fish.temperament = req.body.temperament;
        fish.tankMates = req.body.tankMates;
        fish.enemies = req.body.enemies;
        fish.imgURL = req.body.imgURL;

        fish.save()
        .then(() => res.json("Fish species updated"))
        .catch(err => res.status(400).json("ERROR: " + err));
    })
    .catch(err => res.status(400).json("ERROR: " + err));
});

module.exports = router;