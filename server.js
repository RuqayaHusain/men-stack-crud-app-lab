const dotenv = require("dotenv");
dotenv.config();
const express = require('express');
const morgan = require('morgan');
const path = require("path");
const mongoose =  require('mongoose');
const methodOverride = require('method-override');

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
app.use(methodOverride('_method')); // we override the method before logging it using morgan
//app.use(morgan('dev'));
app.use(express.urlencoded({ extended: false}));// a middleware that converts model into a javascript object
app.use(express.static(path.join(__dirname, "public"))); //added this to be able to add the css

// ROUTES
app.get('/', (req, res) => {
    res.render('index.ejs');
});

app.get('/planets', async (req, res) => { // displays a list of all planets
    const planets = await Planet.find({});
    res.render('planets/index.ejs', {
        planets, //passed planet objects as a local object to be used inside the views/planets/index.ejs file
    });
});

app.get('/planets/new', (req, res) => {
    res.render('planets/new.ejs');
});

app.post('/planets', async (req, res) => {
  if(req.body.hasRings === 'on') {
    req.body.hasRings = true;
  } else {
    req.body.hasRings = false;
  }
  await Planet.create(req.body); // creates a record
  res.redirect('/planets');
});

app.get('/planets/:planetId', async (req, res) => { // displays a specific plant by its ID
  const planetId = req.params.planetId;
  const planet = await Planet.findById(planetId); // get planet from DB base on the id passed in the parameter
  res.render('planets/show.ejs', { planet });
});

app.get('/planets/:planetId/edit', async (req, res) => { // displays a specific plant by its ID
  const planetId = req.params.planetId;
  const planet = await Planet.findById(planetId); // get planet from DB base on the id passed in the parameter
  res.render('planets/edit.ejs', { planet });
});

app.put('/planets/:planetId', async (req, res) => { // updates a specific plant by its ID
  const planetId = req.params.planetId;

  if(req.body.hasRings === 'on') {
    req.body.hasRings = true;
  } else {
    req.body.hasRings = false;
  }

  await Planet.findByIdAndUpdate(planetId, req.body); // updated the specific planet

  res.redirect(`/planets/${planetId}`); // redirects user to the show page
});

app.delete('/planets/:planetId', async (req, res) => { // deletes a specific plant by its ID
  const planetId = req.params.planetId;
  const planet = await Planet.findByIdAndDelete(planetId);
  res.redirect('/planets');
})

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});

