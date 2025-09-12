const dotenv = require("dotenv");
dotenv.config();
const express = require('express');
const morgan = require('morgan');
const mongoose =  require('mongoose');

const app = express();
const PORT = 3000;
// DB CONNECTION
mongoose.connect(process.env.MONGODB_URI);
mongoose.connection.on('connected', () => {
    console.log(`Connected to MongoDB ${mongoose.connection.name}.`);
});
// MODELS
const Planet = require('./models/planet');// you don't have to write the file's extension (.js), when using the require function

// MIDDLEWARE
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: false}));// a middleware that converts model into a javascript object

// ROUTES
app.get('/', (req, res) => {
    res.render('index.ejs');
});

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});

