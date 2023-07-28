// server.js
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const dotenv = require("dotenv");
const app = express();
require('dotenv').config();

const PORT = process.env.PORT || 8070;

app.use(cors());
app.use(bodyParser.json());

mongoose.connect(process.env.MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    // Remove useCreateIndex and useFindAndModify options
    // useCreateIndex: true,
    // useFindAndModify: false
})
.then(() => {
    console.log("MongoDB connection success!");
})
.catch((error) => {
    console.error("MongoDB connection error:", error);
});

// Define your routes and middleware here as needed
// For example:
// const userRoutes = require('./routes/userRoutes');
// app.use('/users', userRoutes);

app.listen(PORT, () => {
    console.log(`Server is up and running on port : ${PORT}`);
});
