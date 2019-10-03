const express = require("express");
const app = express();
const port = process.env.PORT || 5000;

require("dotenv").config();

const mongoose = require("mongoose");
const cors = require("cors");

app.use(cors());
app.use(express.json());

//Configure mongoose to create connection with the database
const uri = "mongodb+srv://admin:admin@cluster0-igwvj.gcp.mongodb.net/test?retryWrites=true&w=majority";
mongoose.connect(uri, {useNewUrlParser: true, useCreateIndex: true})
.catch((err) => {console.log("Mongoose.connect error: " + err)});
const connection = mongoose.connection;
connection.once("open", () => {
    console.log("Connection to MongoDB database established");
});
//Configure server to use the created routes
const fishRouter = require("./routes/fishes");
app.use("/fish", fishRouter);

const userRouter = require("./routes/users");
app.use("/user", userRouter);

if(process.env.NODE_ENV === "production") {
    app.use("../../build");

    app.get("*", (req, res) => {
        res.sendFile(path.resolve(__dirname, "build", "index.html"));
    });
}

//Configure server to run on a certain port
app.listen(port, () => {
    console.log("Server is running on port " + port);
});